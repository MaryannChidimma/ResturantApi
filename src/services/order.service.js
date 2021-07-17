const model = require('../models/order')
const _ = require('lodash')
const menuService = require('../services/menu.service')
class orderService {

    makeOrder = async (data) => {
        return await model.create(data)
    }

    find = async (query, populateItems = true) => {
        let sort = "-createdAt"

        if (query?.sort === "oldest") sort = "createdAt"

        let limit = Number(query.limit) || 30
        const page = Number(query.pageNumber) || 1

        let options = { page, limit, sort }

        if (populateItems) options.populate = "orderItems.menu"

        query = _.omit(query, ["limit", "pageNumber", "sort"])

        return model.paginate(query, options)

    }

    findByOrderId = async (orderId) => {
        return await model.find({ orderId }).populate("orderItem.menu")
    }

    updateOrder = async (id, updateQuery) => {
        return await model.findByIdAndUpdate(id, updateQuery, { new: true })
    }

    calculateDiscount = (discountedValue, price) => {
        const discount = (price / 100) * discountedValue
        return (price - discount)
    }

    calculateSum = (price, quantity) => {
        return (price * quantity)
    }
    updateNoOfOrders = (menus) => {
        console.log(menus.docs.length)
        for (let i = 0; i < menus.docs.length; i++) {
            let num = menus.docs[i].noOfOrder
            menuService.update(menus.docs[i]._id, { noOfOrder: num })
        }
    }
    deleteOrder = async (id) => {
        return await model.remove({ _id: id })
    }

}

module.exports = new orderService
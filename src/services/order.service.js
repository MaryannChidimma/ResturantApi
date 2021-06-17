const model = require('../models/order')
const _ = require('lodash')
const menu = require('../models/menu')


class orderService {

    makeOrder = async (data) => {
        return await model.create(data)
    }

    find = async (query, populateItems = false) => {
        let sort = "-createdAt"

        if (query?.sort === "oldest") sort = "createdAt"

        let limit = Number(query.limit) || 10
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

    deleteOrder = async (id) => {
        return await model.remove({ _id: id })
    }

    menuSum = (menus, qty) => {
        let sum = 0

        menus.forEach(menu => {

            let price = parseFloat(menu.price)
            let quantity = parseFloat(qty[menu._id])

            if (menu.discount === 0) {
                sum += this.calculateSum(price, quantity)
            }
            else {
                const discountedPrice = this.calculateDiscount(menu.discount, price)
                sum += this.calculateSum(discountedPrice, quantity)

            }
        })

        return sum;

    }

}

module.exports = new orderService
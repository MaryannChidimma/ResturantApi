const model = require('../models/order')
const _ = require('lodash')


class orderService {

    makeOrder = async (data) => {
        return await model.create(data)
    }

    find = async (query) => {
        let sort = "-createdAt"

        if (query?.sort === "oldest") sort = "createdAt"

        let limit = Number(query.limit) || 10
        const page = Number(query.pageNumber) || 1

        let options = { page, limit, sort }
        query = _.omit(query, ["limit", "pageNumber", "sort"])

        return model.paginate(query, options)

    }

    findByOrderId = async (orderId) => {
        return await model.find({ orderId })
    }

    calculateDiscount(discountedValue, price) {
        return (price / 100) * discountedValue
    }

}

module.exports = new orderService
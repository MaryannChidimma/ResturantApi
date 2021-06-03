
const { DuplicateError } = require("../../lib/appError");
const model = require("../models/menu");
const _ = require("lodash");

class MenuService {
    async create(data) {
        const existingData = await model.findOne({ name: data.name })
        if (existingData) throw new DuplicateError()
        return await model.create(data);

    }

    async find(query) {

        let limit = Number(query.limit) || 10;
        const page = Number(query.pageNumber) || 1

        const options = { page, limit, populate: 'category' }
        query = _.omit(query, ["limit", "pageNumber"])

        return model.paginate(query, options)

    }

    async update(id, updateQuery) {
        return await model.findByIdAndUpdate(id, updateQuery, { new: true })
    }

    async getOne(id) {
        return await model.findOne({ _id: id });
    }

    async getPopular() {
        return await model.find({}).sort({ noOfOrder: -1 }).limit(15).populate('category', '_id name');
    }
    async getSpecial() {
        return await model.find({ discount: { $ne: 0 } }).populate('category', '_id name');
    }
    async delete(id) {
        return await model.remove({ _id: id });
    }

    rateMenu(newRate, previousRate, noOfPrevRating, noOfRating) {
        const newRating = (newRate + (previousRate * noOfPrevRating)) / noOfRating
        return newRating;
    }

}

module.exports = new MenuService();

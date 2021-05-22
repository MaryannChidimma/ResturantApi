const { DuplicateError } = require("../../lib/appError");
const model = require("../models/menu")


class MenuService {
    async create(data) {
        const existingData = await model.findOne({ name: data.name })
        if (existingData) throw new DuplicateError()
        return await model.create(data);

    }

    async find(query, item) {

        let limit = Number(query.limit) || 10;
        const skip = Number(query.skip) || 0
        const match = item || {}



        return model.aggregate([
            { $match: item },
            { $skip: skip },
            { $limit: limit }
        ])
    }


    async update(id, updateQuery) {
        return await model.findOneAndUpdate(id, updateQuery)
    }

    async getOne(id) {
        return await model.findOne({ _id: id });
    }

    async delete(id) {
        return await model.remove({ _id: id });
    }

}

module.exports = new MenuService()
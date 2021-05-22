const { DuplicateError } = require("../../lib/appError");
const model = require("../models/menu")


class MenuService {
    async create(data) {
        const existingData = await model.findOne({ name: data.name })
        if (existingData) throw new DuplicateError()
        return await model.create(data);

    }

    async find(query, item) {

        const limit = Number(query.limit) || 10;
        const skip = Number((query.page - 1) * query.limit) || 0

        return model.aggregate([
            { $match: match },
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
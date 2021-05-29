const model = require('../models/categories');
const { DuplicateError } = require('../../lib/appError')

class CategoriesService {
    create = async (data) => {
        let checkExists = await model.findOne({ name: data.name })
        if (checkExists) throw new DuplicateError()

        return await model.create(data)
    }
    find = async () => {
        return await model.find()
    }
    update = async (id, data) => {
        return await model.findByIdAndUpdate(id, data, { new: true })
    }
    delete = async (id) => {
        return await model.remove({ _id: id })
    }


}
module.exports = new CategoriesService()
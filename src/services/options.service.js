const model = require("../models/options")
const menu = require("../models/menu")
const { DuplicateError } = require("../../lib/appError")

class optionsService {
    create = async (data) => {
        let checkExists = await model.findOne({ name: data.name });
        if (checkExists) throw new DuplicateError();

        return await model.create(data);
    };
    find = async (query) => {
        const q = query.name ? { name: { $regex: query.name, $options: "i" } } : {};
        return await model.find(q);
    };
    update = async (id, data) => {
        return await model.findByIdAndUpdate(id, data, { new: true });
    };
    delete = async (id) => {
        await menu.remove({ options: id });
        return await model.remove({ _id: id });
    };

}

module.exports = new optionsService()
const category = require("../models/categories");
const { DuplicateError } = require("../../lib/appError");
const menu = require("../models/menu");

class CategoriesService {
	create = async (data) => {
		let checkExists = await category.findOne({ name: data.name });
		if (checkExists) throw new DuplicateError();

		return await category.create(data);
	};
	find = async (query) => {
		const q = query.name ? { name: { $regex: query.name, $options: "i" } } : {};
		return await category.find(q);
	};
	update = async (id, data) => {
		return await category.findByIdAndUpdate(id, data, { new: true });
	};
	delete = async (id) => {
		await menu.remove({ category: id });
		return await category.remove({ _id: id });
	};
}
module.exports = new CategoriesService();

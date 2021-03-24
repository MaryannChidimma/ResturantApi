const CarSub = require('../models/carSubModel');
const catchErrorHandler = require("../utils/catchErrorHandler");
const {
    InternalServerError,
    ExpectationFailedError,
    NotFoundError,
} = require('../../lib/appError')
const response = require('../../lib/appResponse');

class CarSubService {
    async create(data) {
        try {
            const { name, carModelId } = data

            if (!name || !carModelId) throw new ExpectationFailedError();

            const carSub = await new CarSub({ name, carModelId }).save();
            if (!carSub) throw new InternalServerError();

            const carSub_data = { "subCar_Id": carSub._id, name, carModelId }
            return response("You have successfully created a Sub Car", carSub_data)
        }
        catch (err) {
            return catchErrorHandler.errorHandler(err, "failed to create SubCar")
        }
    }

    async getAll() {
        const allCarSub = await CarSub.find();
        if (!allCarSub) throw new InternalServerError();

        return response("Array of all Sub Cars", allCarSub)
    }

    async getOne(carSub_id) {
        const carSub = await CarSub.findOne({ _id: carSub_id });
        if (!carSub_id) throw new NotFoundError();
        return response("required Sub Car", carSub);
    }

    async updateCarSub(carSub_id, data) {
        let { name, carModelId } = data
        if (!name, !carModelId) throw new ExpectationFailedError()

        try {
            let updateCarSub = await CarSub.findOneAndUpdate({ _id: carSub_id }, { $set: data }, {
                new: true,
                upsert: true
            })
            if (updateCarSub) throw new InternalServerError();

            const carSub_data = { "carSub_id": updateCarSub._id, carModelId }
            response("Account was successfully updated", carSub_data)
        }
        catch (err) {
            return catchErrorHandler.errorHandler(err, "SubCars's data could not be updated, try again.")
        }
    }

    async deleteUser(carSub_id) {
        try {
            const carSub = await User.remove({ _id: carSub_id });
            response("sucessfully deleted")//301

        } catch (err) {
            return catchErrorHandler.errorHandler(err, "Could not delete Sub Car, try again.")
        }
    }
}

module.exports = module.exports = new CarSubService();

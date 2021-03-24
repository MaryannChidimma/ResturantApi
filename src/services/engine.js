const Engine = require('../models/carSubModel');
const catchErrorHandler = require("../utils/catchErrorHandler");
const {
    InternalServerError,
    ExpectationFailedError,
    NotFoundError,
} = require('../../lib/appError')
const response = require('../../lib/appResponse');

class EngineService {
    async create(data) {
        try {
            const { name, carSubModelId } = data

            if (!name || !carSubModelId) throw new ExpectationFailedError();

            const engine = await new Engine({ name, carSubModelId }).save();
            if (!engine) throw new InternalServerError();

            const engine_data = {"engine_Id": engine._id, name, carSubModelId }
            return response("You have successfully created a Sub Car", engine_data)
        }
        catch (err) {
            return catchErrorHandler.errorHandler(err, "failed to create engine")
        }
    }

    async getAll() {
        const allEngine = await Engine.find();
        //if (!allEngine) throw new InternalServerError();
       return response("Array of all Sub Cars", allEngine)
    }

    async getOne(engine_id) {
        const engine = await Engine.findOne({ _id: engine_id });
        if (!engine_id) throw new NotFoundError();
        return response("required engine", engine);
    }

    async updateCarSub(engine_id, data) {
        let { name, carSubModelId } = data
        if (!name, !carSubModelId) throw new ExpectationFailedError()

        try {
            let updateEngine = await Engine.findOneAndUpdate({ _id: engine_id }, { $set: data }, {
                new: true,
                upsert: true
            })
            if (!updateEngine) throw new InternalServerError();

            const engine_data = { "engine_id": updateEngine._id, carSubModelId }
            response("engine was successfully updated", carSub_data)
        }
        catch (err) {
            return catchErrorHandler.errorHandler(err, "engine's data could not be updated, try again.")
        }
    }

    async deleteUser(engine_id) {
        try {
            const engine = await Engine.remove({ _id: engine_id });
            response("sucessfully deleted")

        } catch (err) {
            return catchErrorHandler.errorHandler(err, "Could not delete Engine, try again.")
        }
    }
}

module.exports = module.exports = new EngineService();

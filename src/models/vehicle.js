const mongoose = require('mongoose');
const vehicleSchema = mongoose.Schema({
    name: { type: String ,require: true},
    carModelId:{ type: mongoose.SchemaTypes.ObjectId, ref: "carModel" },
    carSubModelId:{ type: mongoose.SchemaTypes.ObjectId, ref: "carSubModel" },
    engineId:{ type: mongoose.SchemaTypes.ObjectId, ref: "engine" },
    carmakeId:{ type: mongoose.SchemaTypes.ObjectId, ref: "carMake" },
},  {timestamps : true, toObject : {getters : true}});

module.exports = mongoose.model('vehicle', vehicleSchema);
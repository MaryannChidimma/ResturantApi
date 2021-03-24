const mongoose = require('mongoose');
const carModelSchema = mongoose.Schema({
    name: { type: String ,require: true},
    carMakeId:{ type: mongoose.SchemaTypes.ObjectId, ref: "carMake" },
},  {timestamps : true, toObject : {getters : true}});

module.exports = mongoose.model('carModel', carModelSchema);
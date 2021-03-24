const mongoose = require('mongoose');
const carSubModelSchema = mongoose.Schema({
    name: { type: String , require: true},
    carModelId:{ type: mongoose.SchemaTypes.ObjectId, ref: "carModel" },
},  {timestamps : true, toObject : {getters : true}});

module.exports = mongoose.model('carSubModel', carSubModelSchema);
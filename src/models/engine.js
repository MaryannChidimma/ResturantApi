const mongoose = require('mongoose');
const engineSchema = mongoose.Schema({
    name: { type: String , require: true},
    carsubModelId:{ type: mongoose.SchemaTypes.ObjectId, ref: "carSubModel" },
},  {timestamps : true, toObject : {getters : true}});

module.exports = mongoose.model('engine', engineSchema);
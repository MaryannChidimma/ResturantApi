const mongoose = require('mongoose');
const carMakeSchema = mongoose.Schema({
    name: { type: String , require: true},
    year: { type: String ,require: true}
},  {timestamps : true, toObject : {getters : true}});

module.exports = mongoose.model('carMake', carMakeSchema);
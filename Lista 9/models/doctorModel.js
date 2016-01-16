var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var doctorModel = new Schema({
    degree: {type: String},
    name: {type: String},
    surname: {type: String},
    specialty: {type: String},
    commercial_only: {type: Boolean, default: false},
    appointment_price: {type: Number}
});

module.exports = mongoose.model('Doctor', doctorModel);
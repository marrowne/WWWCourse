var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var patientModel = new Schema({
    name: {type: String},
    surname: {type: String},
    birth_date: {type: String}
});

module.exports = mongoose.model('Patient', patientModel);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var appointmentModel = new Schema({
    patient: {type: String},
    doctor: {type: String},
    date: {type: String},
    time: {type: String},
    commercial: {type: Boolean, default: false}
});

module.exports = mongoose.model('Appointment', appointmentModel);
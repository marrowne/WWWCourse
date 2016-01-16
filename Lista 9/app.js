var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// TODO Ja postawiłem sobie MongoDB na kompie.
// Jeśli ktoś chce tak samo zrobić niech znajdzie sobie jakiegoś tutoriala,
// ale specjalnie dla Was postawiłem Mongo w sieci, tak żeby API działało OOTB.

var db = mongoose.connect('mongodb://przemek:przemek111@ds037415.mongolab.com:37415/surgery_api');
//var db = mongoose.connect('mongodb://localhost/surgeryAPI');

var Patient = require('./models/patientModel');
var Doctor = require('./models/doctorModel');
var Appointment = require('./models/appointmentModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

patientRouter = require('./routes/patientRoutes')(Patient);
doctorRouter = require('./routes/doctorRoutes')(Doctor);
appointmentRouter = require('./routes/appointmentRoutes')(Appointment);


app.use('/api/patient', patientRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/appointment', appointmentRouter);


app.get('/', function (req, res) {
    res.send('Dopisz api/doctor, api/patient lub api/appointment');
});

app.listen(port, function () {
    console.log('Gulp is running my app on PORT: ' + port);
});

module.exports = app;
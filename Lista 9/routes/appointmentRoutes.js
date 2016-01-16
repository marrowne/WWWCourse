var express = require('express');


var routes = function (Appointment) {
    var appointmentRouter = express.Router();

    var appointmentController = require('../controllers/appointmentController')(Appointment);
    appointmentRouter.route('/')
        .post(appointmentController.post)
        .get(appointmentController.get);

    appointmentRouter.use('/:appointmentId', function (req, res, next) {
        Appointment.findById(req.params.appointmentId, function (err, appointment) {
            if (err)
                res.status(500).send(err);
            else if (appointment) {
                req.appointment = appointment;
                next();
            }
            else {
                res.status(404).send('no appointment found');
            }
        });
    });
    appointmentRouter.route('/:appointmentId')
        .get(function (req, res) {

            var returnAppointment = req.appointment.toJSON();

            returnAppointment.links = {};

            var dayDoctorLinks = 'http://' + req.headers.host + '/api/appointment/?date=' + returnAppointment.date +
                '&doctor=' + returnAppointment.doctor;
            returnAppointment.links.DayDoctorAppointments = dayDoctorLinks.replace(' ', '%20');

            var doctorLink = 'http://' + req.headers.host + '/api/doctor/' + returnAppointment.doctor;
            returnAppointment.doctor = doctorLink.replace(' ', '%20');

            var patientLink = 'http://' + req.headers.host + '/api/patient/' + returnAppointment.patient;
            returnAppointment.patient = patientLink.replace(' ', '%20');


            res.json(returnAppointment);

        })
        .put(function (req, res) {
            req.appointment.patient = req.body.patient;
            req.appointment.doctor = req.body.doctor;
            req.appointment.date = req.body.date;
            req.appointment.time = req.body.time;
            req.appointment.commercial = req.body.commercial;
            req.appointment.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.appointment);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.appointment[p] = req.body[p];
            }

            req.appointment.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.appointment);
                }
            });
        })
        .delete(function (req, res) {
            req.appointment.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return appointmentRouter;
};

module.exports = routes;
var express = require('express');


var routes = function (Doctor) {
    var doctorRouter = express.Router();

    var doctorController = require('../controllers/doctorController')(Doctor);
    doctorRouter.route('/')
        .post(doctorController.post)
        .get(doctorController.get);

    doctorRouter.use('/:doctorId', function (req, res, next) {
        Doctor.findById(req.params.doctorId, function (err, doctor) {
            if (err)
                res.status(500).send(err);
            else if (doctor) {
                req.doctor = doctor;
                next();
            }
            else {
                res.status(404).send('no doctor found');
            }
        });
    });
    doctorRouter.route('/:doctorId')
        .get(function (req, res) {

            var returnDoctor = req.doctor.toJSON();

            returnDoctor.links = {};
            var specialtyLink = 'http://' + req.headers.host + '/api/doctor/?specialty=' + returnDoctor.specialty;
            returnDoctor.links.FilterBySpecialty = specialtyLink.replace(' ', '%20');

            var appointmentsLink = 'http://' + req.headers.host + '/api/appointment/?doctor=' + returnDoctor._id;
            returnDoctor.links.DoctorsAppointments = appointmentsLink.replace(' ', '%20');

            res.json(returnDoctor);

        })
        .put(function (req, res) {
            req.doctor.degree = req.body.degree;
            req.doctor.name = req.body.name;
            req.doctor.surname = req.body.surname;
            req.doctor.specialty = req.body.specialty;
            req.doctor.commercial_only = req.body.commercial_only;
            req.doctor.appointment_price = req.body.appointment_price;
            req.doctor.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.doctor);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.doctor[p] = req.body[p];
            }

            req.doctor.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.doctor);
                }
            });
        })
        .delete(function (req, res) {
            req.doctor.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return doctorRouter;
};

module.exports = routes;
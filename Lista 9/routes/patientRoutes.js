var express = require('express');


var routes = function (Patient) {
    var patientRouter = express.Router();

    var patientController = require('../controllers/patientController')(Patient);
    patientRouter.route('/')
        .post(patientController.post)
        .get(patientController.get);

    patientRouter.use('/:patientId', function (req, res, next) {
        Patient.findById(req.params.patientId, function (err, patient) {
            if (err)
                res.status(500).send(err);
            else if (patient) {
                req.patient = patient;
                next();
            }
            else {
                res.status(404).send('no patient found');
            }
        });
    });
    patientRouter.route('/:patientId')
        .get(function (req, res) {

            var returnPatient = req.patient.toJSON();

            returnPatient.links = {};
            var newLink = 'http://' + req.headers.host + '/api/appointment/?patient=' + returnPatient._id;
            returnPatient.links.PatientsAppoinments = newLink.replace(' ', '%20');
            res.json(returnPatient);

        })
        .put(function (req, res) {
            req.patient.name = req.body.name;
            req.patient.surname = req.body.surname;
            req.patient.birth_date = req.body.birth_date;
            req.patient.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.patient);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.patient[p] = req.body[p];
            }

            req.patient.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.patient);
                }
            });
        })
        .delete(function (req, res) {
            req.patient.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return patientRouter;
};

module.exports = routes;
var patientController = function (Patient) {

    var post = function (req, res) {
        var patient = new Patient(req.body);

        if (!req.body.name) {
            res.status(400);
            res.send('Name is required');
        }
        else if (!req.body.surname) {
            res.status(400);
            res.send('Surname is required');
        }
        else {
            patient.save();
            res.status(201);
            res.send(patient);
        }
    };

    var get = function (req, res) {

        var query = {};

        Patient.find(query, function (err, patients) {

            if (err)
                res.status(500).send(err);
            else {

                var returnPatients = [];
                patients.forEach(function (element, index, array) {
                    var newPatient = element.toJSON();
                    newPatient.links = {};
                    newPatient.links.self = 'http://' + req.headers.host + '/api/patient/' + newPatient._id
                    returnPatients.push(newPatient);
                });
                res.json(returnPatients);
            }
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = patientController;
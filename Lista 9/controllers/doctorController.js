var doctorController = function (Doctor) {

    var post = function (req, res) {
        var doctor = new Doctor(req.body);

        if (!req.body.name) {
            res.status(400);
            res.send('Name is required');
        }
        else if (!req.body.surname) {
            res.status(400);
            res.send('Surname is required');
        }
        else {
            doctor.save();
            res.status(201);
            res.send(doctor);
        }
    };

    var get = function (req, res) {

        var query = {};

        if (req.query.specialty) {
            query.specialty = req.query.specialty;
        }
        Doctor.find(query, function (err, doctors) {

            if (err)
                res.status(500).send(err);
            else {

                var returnDoctors = [];
                doctors.forEach(function (element, index, array) {
                    var newDoctor = element.toJSON();
                    newDoctor.links = {};
                    newDoctor.links.self = 'http://' + req.headers.host + '/api/doctor/' + newDoctor._id
                    returnDoctors.push(newDoctor);
                });
                res.json(returnDoctors);
            }
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = doctorController;
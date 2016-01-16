var appointmentController = function (Appointment) {

    var post = function (req, res) {
        var appointment = new Appointment(req.body);

        if (!req.body.doctor) {
            res.status(400);
            res.send('Doctor is required');
        }
        else if (!req.body.patient) {
            res.status(400);
            res.send('Surname is required');
        }
        else {
            appointment.save();
            res.status(201);
            res.send(appointment);
        }
    };

    var get = function (req, res) {

        var query = {};

        if (req.query.doctor) {
            query.doctor = req.query.doctor;
        }
        if (req.query.patient) {
            query.patient = req.query.patient;
        }
        if (req.query.date) {
            query.date = req.query.date
        }
        Appointment.find(query, function (err, appointments) {

            if (err)
                res.status(500).send(err);
            else {

                var returnAppointments = [];
                appointments.forEach(function (element, index, array) {
                    var newAppointment = element.toJSON();
                    newAppointment.links = {};
                    newAppointment.links.self = 'http://' + req.headers.host + '/api/appointment/' + newAppointment._id
                    returnAppointments.push(newAppointment);
                });
                res.json(returnAppointments);
            }
        });
    };

    return {
        post: post,
        get: get
    }
};

module.exports = appointmentController;
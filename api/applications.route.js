const express = require('express');
const applicationsRoutes = express.Router();

// Require Business model in our routes module
let Applications = require('./applications.model');

// Defined store route
applicationsRoutes.route('/add').post(function (req, res) {
    let applications = new Applications(req.body);
    applications.save()
        .then(applications => {
            res.status(200).json({'applications': 'applications in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
applicationsRoutes.route('/').get(function (req, res) {
    Applications.find(function (err, applicationss) {
        if (err) {
            console.log(err);
        } else {
            res.json(applicationss);
        }
    });
});

// Defined edit route
applicationsRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Applications.findById(id, function (err, business) {
        console.log(business);
        res.json(business);

    });
});

//  Defined update route
applicationsRoutes.route('/update/:id').post(function (req, res) {
    Applications.findById(req.params.id, function (err, applications) {
        if (!applications)
            res.status(404).send("data is not found");
        else {
            console.log(applications);
            applications.name = req.body.name;
            applications.os = req.body.os;
            applications.type = req.body.type;
            applications.description = req.body.description;
            applications.identifier = req.body.identifier;

            applications.save().then(business => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
applicationsRoutes.route('/delete/:id').get(function (req, res) {
    Applications.findByIdAndRemove({_id: req.params.id}, function (err, applications) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = applicationsRoutes;

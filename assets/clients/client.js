'use strict';
const co = require('co-express');
const mongoose = require('mongoose');

// Schemas && model
const locationSchema = require('../db/schema').locationSchema;
const LocationModel = mongoose.model('Location', locationSchema);

module.exports.validate = function(req, res, next) {
    if (req.body.lat && req.body.long)
        next();
    else {
        res.status(400);
        res.send("Latitude and longitude needed");
    }
}

/**
 * imlement field based projection.
 */

module.exports.getAll = co(function*(req, res) {
    try {
        var documents = yield LocationModel.find({});
        res.json(documents);
    } catch (e) {
        console.log(e);
        res.render('error', {
            message: e.message,
            error: e
        })
    }
})

module.exports.get = co(function*(req, res) {
    console.log('get :: opt ', req.params.client);
    try {
        var documents;
        if (req.params.client) {
            documents = yield LocationModel.find({
                clientId: req.params.client
            });
        };
        res.json(documents);
    } catch (e) {
        console.log(e);
        res.render('error', {
            message: e.message,
            err: e
        })
    }
});

module.exports.add = co(function*(req, res) {
    console.log('=== POST ===');
    console.log('params ', req.params);
    console.log('body ', req.params);
    console.log('add :: opt ', req.params.client);
    var client = new LocationModel({
        latitude: req.body.lat,
        longitude: req.body.long,
        location: [req.body.long, req.body.lat],
        created_at: new Date,
        clientId: req.params.client,
        type: "location"
    });

    yield client.save(); // saving the record.

    res.location('http://localhost:3000/location/' + req.params.client);
    res.status(201);
    res.send()
});

module.exports.delete = co(function*(req, res) {
    console.log('remove :: opt ', req.params.client);
    var wr = yield LocationModel.remove({
        clientId: req.params.client.trim()
    }).exec(); // check.

    console.log('delete result : ', wr.result);
    if ( wr.result.ok && wr.result.n) {
        // a record was successfully deleted
        res.status(204);
        res.send();
    } else {
        // no record was successfully deleted
        res.status(404);
        res.render('error', {
            message: 'Resource does not exist',
            error: {}
        })
    }
});

module.exports.update = co(function*(req, res) {
    console.log('update :: opt ', req.params.client, req.body);
    var query = yield LocationModel.update({
        clientId: req.params.client.trim()
    }, {
        $set: {
            latitude: req.body.lat,
            longitude: req.body.long,
            location: [req.body.long, req.body.lat],
            updated_at: new Date
        }
    }, {
        upsert: false,
        strict: true,
        multi: true
    }).exec();

    console.log('Query : ', query);
    res.location('http://localhost:3000/location/' + req.params.client);
    res.status(201);
    res.send()
});
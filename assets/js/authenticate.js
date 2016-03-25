'use strict';

const config = require('./config.js');
/**
 * Using JsonWebtoken to keep access
 * token in user end, retriving from
 * client.
 */
const jwt = require('jsonwebtoken');

module.exports.authenticate = function(req, res, next) {
    if (req.body.name && req.body.password) {
    	console.log(req.body)
        if (config.helperClient.name == req.body.name &&
            config.helperClient.password == req.body.password) {
            var token = jwt.sign(config.helperClient, config.secret, {
                expiresInMinutes: 60 // expires in 24 hours
            });

            res.json({
                success: true,
                message: 'AccessToken',
                token: token
            });
        } else {
            res.status(401);
            return res.send("Unauthorized User");
        }
    }
}


module.exports.checkAccess = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(401)
                    .json({ success: false, message: 'Access Token failed.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'Token not provided.'
        });
    }
}
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationDocument = new Schema({
    latitude: Number,
    longitude: Number,
    location: [Number,Number],
    created_at: { type: Date, default: Date.now },
    updated_at : { type: Date, default: null },
    clientId : String,
    type:String
});



module.exports.locationSchema = locationDocument;
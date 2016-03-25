'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helperClientSchema = new Schema({
	userName : String,
	password : String,
    type:{ type: Date, default: "HelperClient" }
});

const HelperClient = mongoose.model('HelperClient',helperClientSchema);

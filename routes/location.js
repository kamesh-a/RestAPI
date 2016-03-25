/**
 * HelperClient which can
 * get clients data from the
 * mongodb with location
 */

'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config =  require('../assets/js/config.js');
const client =  require('../assets/clients/client.js');
const auth =  require('../assets/js/authenticate.js');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('DB["test"] is open');
});
mongoose.connect(config.database);

// Public API for victimClient to register it geoLocation
// VictimClient while button push can use this to store
// info in LocationDB
router.post('/:client', client.validate, client.add);

// Private API for HelperClients to get information for dashboard
router.get('/', auth.checkAccess, client.getAll);
router.get('/:client', auth.checkAccess,  client.get);
router.delete('/:client', auth.checkAccess , client.delete);
router.put('/:client', auth.checkAccess , client.validate, client.update); 

module.exports = router;
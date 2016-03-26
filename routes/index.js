var express = require('express');
var router = express.Router();
const auth =  require('../assets/js/authenticate.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  	{ 
  		title: 'RestAPIDemo' , 
  		message : '[post] to "http://localhost:3000/getAccess" with {name : "admin" , pass : "admin"} to get Access token',
  		api : 'All Private API need access token to do operation',
  		getAccess: 'POST[public] : "http://localhost:3000/getAccess" with {name : "admin" , pass : "admin"}',
  		post: 'POST[public][ADD] : "http://localhost:3000/location/:victimClient" ( body : {lat & long} ) will store in DB, returns 201 & location header',
  		getAll: 'GET[private][RETRIVE] : "http://localhost:3000/location" returns JSON of all clients in DB',
  		get: 'GET[private][RETRIVE] : "http://localhost:3000/location/:victimClient" returns victimClient',
  		put: 'PUT[private][UPDATE] : "http://localhost:3000/location/:victimClient" ( body : {lat & long} ) update long&lat for editing purpose, returns 201 & location header',
  		del: 'DELETE[private][DEL] : "http://localhost:3000/location/:victimClient" deletes victimClient and returns 204',
  		token :"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNDU4OTE5MDM5LCJleHAiOjE0NTg5MjI2Mzl9.ORZmUH47HPjTKh4R1BmyvakHAjTDuaDzkpLR9CxjwBs"
  	});
});

router.post('/getAccess', auth.authenticate);

module.exports = router;

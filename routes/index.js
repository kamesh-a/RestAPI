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
  		post: 'POST[public] : "http://localhost:3000/:victimClient" will store in DB, returns 201 & location header',
  		getAll: 'GET[private] : "http://localhost:3000" returns JSON of all clients in DB',
  		get: 'GET[private] : "http://localhost:3000/:victimClient" returns victimClient',
  		put: 'PUT[private] : "http://localhost:3000/:victimClient" update long&lat for editing purpose, returns 201 & location header',
  		del: 'DELETE[private] : "http://localhost:3000/:victimClient" deletes victimClient and returns 204',
  		token :"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNDU4OTE5MDM5LCJleHAiOjE0NTg5MjI2Mzl9.ORZmUH47HPjTKh4R1BmyvakHAjTDuaDzkpLR9CxjwBs"
  	});
});

router.post('/getAccess', auth.authenticate);

module.exports = router;

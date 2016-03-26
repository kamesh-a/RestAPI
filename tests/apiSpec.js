var assert = require('chai').assert;
var request = require('supertest');
var config = require('../assets/js/config.js');
var request = require('supertest');
var jwt = require('jsonwebtoken');


var accessToken = jwt.sign(config.helperClient, config.secret, {
    expiresInMinutes: 60 // expires in 24 hours
});


describe('Api testing..', function() {
    var baseURL = 'http://localhost:3000'

    it('should be 200 ok', function(done) {
        request(baseURL)
            .get('/')
            .expect(200, done);
    });

    it('POST[public] : "http://localhost:3000/getAccess" with {name : "admin" , pass : "admin"}', function(done) {
        var client = '/getAccess';
        request(baseURL)
            .post(client)
            .set('Accept', 'application/json')
            .send({ name: 'admin', password: 'admin' })
            .expect(200, {
                "success": true,
                "message": "AccessToken",
                "token": accessToken
            },done)
    });


    it('POST[public][ADD] : "http://localhost:3000/client1110" will store in DB, returns 201 & location header', function(done) {
        var client = '/location/client1110';
        request(baseURL)
            .post(client)
            .send({ lat: '11.222', long: '123.223' })
            .expect('location', baseURL + client)
            .expect(201, done);
    });


    /**
     * Private API with access tokens
     */

    it('GET[private][RETRIVE] : "http://localhost:3000/location" returns JSON of all clients in DB', function(done) {
        var client = '/location';
        request(baseURL)
            .get(client)
            .set('x-access-token', accessToken)
            .expect(200, function(err, res){
            	if (err) return done(err);
        		if(res.body.length > 0 )
        			done();
        		else 
        			done(new Error('There is no persisted test record for :victimClient["client1110"]'))
            })
    });

    it('GET[private][RETRIVE] : "http://localhost:3000/location/client1110" returns victimClient', function(done) {
        var client = '/location/client1110';
        request(baseURL)
            .get(client)
            .set('x-access-token', accessToken)
            .expect(200, function(err, res){
            	if (err) return done(err);
        		if(res.body.length > 0 )
        			done();
        		else 
        			done(new Error('There is no persisted test record :victimClient["client1110"] '))
            })
    });

    it('PUT[private][UPDATE] : "http://localhost:3000/location/client1110" ( body : {lat & long} ) update long&lat for editing purpose, returns 201 & location header', function(done) {
        var client = '/location/client1110';
        request(baseURL)
            .put(client)
            .set('x-access-token', accessToken)
            .send({ lat: '33.33', long: '44.44' })
            .expect(201, function(err, res){
            	request(baseURL)
            	.get(client)
            	.set('x-access-token', accessToken)
            	.expect(200,function(err,res){
            		if(err) done(err)
            		else{
            			// res.body is array of result objects.
            			if( res.body.length > 0 && res.body[0].latitude == 33.33 && res.body[0].longitude == 44.44 )
            				done(); 
            			else
            				done(new Error('lat and long should match 33.33 && 44.44'))
            		}
            	});
            })
    });

    it('DELETE[private][DEL] : "http://localhost:3000/location/client1110" deletes victimClient and returns 204', function(done) {
        var client = '/location/client1110';
        request(baseURL)
            .delete(client)
            .set('x-access-token', accessToken)
            .expect(204, done);
    });


});
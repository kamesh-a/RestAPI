# RestAPI

RestAPI 

prerequisites :
	- mongodb 3.2
	- node 4.x
	- mocha ( for running test cases )

Used
- ES6 generators
- co 
- mongoose ( ODM )


RestAPIDemo

Welcome to [post] to "http://localhost:3000/getAccess" with {name : "admin" , pass : "admin"} to get Access token

================= API Usage =================

GetACCESS-Token :

POST[public] : "http://localhost:3000/getAccess" with {name : "admin" , pass : "admin"}

exampleToken : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNDU4OTE5MDM5LCJleHAiOjE0NTg5MjI2Mzl9.ORZmUH47HPjTKh4R1BmyvakHAjTDuaDzkpLR9CxjwBs

Add:

```
POST[public][ADD] : "http://localhost:3000/location/:victimClient" ( body : {lat & long} ) will store in DB, returns 201 & location header
```

( Note : All Private API need access token to do operation )

GetAllClients:
```
GET[private][RETRIVE] : "http://localhost:3000/location" returns JSON of all clients in DB
```
GetSingleClient:
```
GET[private][RETRIVE] : "http://localhost:3000/location/:victimClient" returns victimClient
```
UpdateClientRecord:
```
PUT[private][UPDATE] : "http://localhost:3000/location/:victimClient" ( body : {lat & long} ) update long&lat for editing purpose, returns 201 & location header
```
Edit/Delete:
```
DELETE[private][DEL] : "http://localhost:3000/location/:victimClient" deletes victimClient and returns 204
```

================= Run Server: =================
```
>> npm install #installs deps
>> npm run start #starts the server on localhost 3000 port
```

================= Run Test cases: =================
```
>> npm run tests
```

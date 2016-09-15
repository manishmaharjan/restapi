var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//This will list everything with GET request from the database
app.get("/", function(req, res){
	fs.readFile(__dirname + "/"+ "database.json", 'utf8', function(err, data){
		console.log("GET method requested", data);
		res.end(data);
	});
})

//This responds a GET request through ID for the Homepage
app.get('/:id', function (req, res) {
	// First read existing students.
	fs.readFile(__dirname + "/" + "database.json", 'utf8', function (err, data) {
		data1 = JSON.parse( data );
		var studentsbyid = data1["student" + req.params.id]
		console.log( "GET method requested by ID ", studentsbyid );
		res.end( JSON.stringify(studentsbyid))
	});
})

//This responds a PUT request for the Homepage
app.put('/', function (req, res) {
	var student = {
	"student3":{
		"name" : "Tommi",
		"address" : "Vaasa",
		"class" : "2011",
		"course_name": "Business",
		"course_description" : "Business is analyzed and business module is created in this course",
		"grade":"1",
		"id" : "3"
	},
}
	//first read existing students.
	fs.readFile(__dirname + "/" + "database.json", 'utf8', function(err, data){
		data = JSON.parse(data);
		data["student3"]= student["student3"];
		console.log("PUT method requested",data);
		res.end(JSON.stringify (data));
	});
})


//This responds a DELETE request for the Homepage
var id = 2;
app.delete('/', function (req, res) {
	//First reading existing students.
	fs.readFile(__dirname + "/" + "database.json", 'utf8', function (err, data) {
		data = JSON.parse( data );
		delete data["student" + 2];
		console.log( "DELETE method requested", data );
		res.send( JSON.stringify(data));
	});
	
})


//This responds a POST request for the Homepage
app.post('/', function (req, res){
	var teststudent = {
		name : req.body.name,
		address : req.body.address,
		year : req.body.class,
		course : req.body.course_name,
		coursedes : req.body.course_description,
		grade : req.body.grade,
		id : req.body.id
	}
	res.send(JSON.stringify(req.body));
	console.log("POST method requested", teststudent)
});


var server = app.listen(3333, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Manish Rest Api app listening at http://%s:%s", host, port)
})
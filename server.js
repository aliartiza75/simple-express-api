
/////////////////////////////////// MODULES ///////////////////////////////////////////

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cassandra = require('cassandra-driver');


// Enviroment Variables
var port = 3000

// Express Router 
var router = express.Router();

// Dummy router for testing
router.get('/',	function  ( req, res ) {
	res.json({message : " Server is up and running on : localhost:3000 \ n To access the api's : localhost:3000/api"})

});

// Registering all router with /api
app.use('/api', router 	);

// Starting the server
app.listen(port)


// Creating the Express Application
// I don't know what is this for
 // Using the body-parser modeule in our app
 app.use(bodyParser.urlencoded({
 	extended: true
}));



////////////////////////////////// CREATING ROUTES ////////////////////////////////////////////

var employeesRoute = router.route('/employees');
var create_table = router.route('/employees/create_table');
var employeeRoute = router.route('/employees/:emp_id');

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// REST API CODE //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////




// Creating endpoint /api/employees for POSTS
// Adding employee to the employee table
// API URL :  http://localhost:3000/api/employees
employeesRoute.post( function ( req, res ) {

	var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: "abc"});
	client.execute("INSERT INTO emp( emp_id , emp_city , emp_name, emp_phone , emp_sal ) VALUES ( 1, 'pak'"+
		",'sanghar' , 03133137377 , 10000)",  function (err, result) {

		if (err) {
			res.send(err)		
		}
		else {
			res.send("Employee has been added in employee table")
		}
	 	
		});
});


create_table.post( function ( req, res ) {

	var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: "abc"});
	client.execute("CREATE TABLE emp( emp_id int PRIMARY KEY, emp_name text, emp_city text,   emp_sal varint,   emp_phone varint);",  function (err, result) {

		if (err) {
			res.send("Process Failed \n "+err)		
		}
		else {
			res.send("Employee Table has been added in keyspace")
		}
		});
});



// Retreiving all employees data 
// API URL : http://localhost:3000/api/employees
employeesRoute.get (function ( req ,res ) {
	
	var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: "abc"});
	client.execute("SELECT * from emp",  function (err, result) {
  	
		if (err) {
			res.send(err)		
		}
		else {
			res.json(result)
		}
	});
});



// Get Employee data on the basis of emp_id
// API URL : http://localhost:3000/api/employees/emp_Id
employeeRoute.get(function(req, res) {
  	// Use the employee model to find a specific employee
    
    var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: "abc"});
	client.execute("SELECT * from emp where emp_id = "+req.params.emp_id+"",  function (err, result) {
  	
		if (err) {
			res.send(err)		
		}
		else {
			res.json(result)
		}
	});
});

// Update the record of an employee using emp_id
// API URL : http://localhost:3000/api/employees/emp_id
employeeRoute.put(function(req, res) {
  	
  	var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: "abc"});
	client.execute("UPDATE emp SET emp_name='kabul',emp_sal=50000 WHERE emp_id="+req.params.emp_id+";",  function (err, result) {
  	
		if (err) {
			res.send(err)		
		}
		else {
			res.json("Record Updated")
		}
	});
});


// Delete User record using emp_id
// API URL : http://localhost:3000/api/employees/emp_id
employeeRoute.delete(function(req, res) {
  	
  	var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: "abc"});
	client.execute("DELETE emp_sal FROM emp WHERE emp_id="+req.params.emp_id+";",  function (err, result) {
  	
		if (err) {
			res.send(err)		
		}
		else {
			res.json("Record Deleted")
		}
	});
});






































////////////////////////////////// 	SERVER CODE ///////////////////////////////////////
//  Node Server code
// Listening to 
// IP ; 127.0.0.1 or localhost
// Port:3000
// default handler is '/' which will display the content of the index file
/*app.listen(3000, function() {
  	console.log('listening on 3000')
	
	app.get('/', function(req, res) { // default handler
	  //res.send('Hello World') // to send the message to the client
	  res.sendFile("/home/irti/Desktop/simple_node/"+'index.html');
	})
});
*/










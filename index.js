const express  = require('express');
const bodyparser = require('body-parser');


// express app

const app = express();
var cors = require('cors');
app.use(cors());
// setup port 

const port = process.env.PORT || 8080;

// parse request data  content type application/x-www-form-urlencode - middleware

app.use(bodyparser.urlencoded({extended:false}));

// parse request data  content type application/json - middleware

app.use(bodyparser.json());


// root route

app.get('/',(req,res)=>{

    res.send('Parking module server is running and using port '+port);


});

// import routes

const parkingroutes = require('./src/routes/parkingroutes');

// create routes


app.use('/v1/api/parking',parkingroutes);



// listen to the port

app.listen(port,()=>{

    console.log('express  server is running at port  ' + port); 
 
 });
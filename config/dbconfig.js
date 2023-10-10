const mysql = require('mysql2');

// mysql connection



const dbConn =  mysql.createConnection({

   host : "localhost",
   user : "root",
   password : "password",
   database : "parkingdb",
   //timezone:'utc',
   dateStrings:true
   
});

dbConn.connect((error)=>{


    if(error)
       throw error;
    console.log("Database connection successful");

});

module.exports = dbConn;
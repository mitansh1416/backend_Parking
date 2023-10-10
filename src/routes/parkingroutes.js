const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

//import constroller
const parkingcontroller = require('../controller/parkingcontroller');

//Main  route

router.get('/',(req,res)=>{

      res.send("Server Base URL");
});

// create customer , user and get customer data  and only customer name

router.post('/createcustomer',parkingcontroller.insertcustomer);
router.get('/getcustomerdata',parkingcontroller.getcustomer);
router.get('/getcustomername',parkingcontroller.getcustomername);


// get user data

router.get('/getuserdata',parkingcontroller.getuser);

// get offered services

router.get('/getofferedservices',parkingcontroller.getofferedservicesdata);

//create vehicle (Registration) and vehicle data

router.post('/createvehicle',parkingcontroller.insertvehicle);
router.get('/getvehicledata',parkingcontroller.getvehicle);
router.get('/getregistration-NO',parkingcontroller.getregnumber);
router.post('/getregdatacustid',parkingcontroller.getregdatacustid);

// create parking lot attendent and get attendant data
router.post('/createattendant',parkingcontroller.createattendant);
router.get('/getattendantdata',parkingcontroller.getattendant);

// create spareit admin and get admin data
router.post('/createspareitadmin',parkingcontroller.createadminspareit);
router.get('/getspareitadmindata',parkingcontroller.getadminspareitdata);

// create parking lot , get parking lot data and get parking lot names
router.post('/createparkinglot',parkingcontroller.createparkinglot);
router.get('/getparkinglotdata',parkingcontroller.getparkinglotdata);
router.get('/getparkinglotname',parkingcontroller.getparkingname);

// create transaction and get all transaction
router.post('/createtransaction-IN',parkingcontroller.createtransactionIn);
router.get('/gettransactiondata',parkingcontroller.gettransactiondata);
router.post('/getdatabyattendantid',parkingcontroller.getdatabyattendant);
router.post('/getdatabyregno',parkingcontroller.getdatabyregnumber);
router.post('/createtransaction-out',parkingcontroller.createtransactionOut);


//Validate transaction for in and out
router.post('/transactionvalidation',parkingcontroller.validatetransaction);

// filter transaction and services
router.post('/filtertransaction',parkingcontroller.filtertransaction);
router.post('/filterservice',parkingcontroller.filterservice);
router.post('/filltercustomernameandparkinglotname',parkingcontroller.filtercustomerparkingdata);

module.exports = router;
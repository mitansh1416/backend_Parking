const customermodel = require('../models/customerparkingmodel');
const usermodel = require('../models/userparkingmodel');
const vehiclemodel = require('../models/vehicleparkingmodel');
const attendantmodel = require('../models/attendantparkingmodel');
const spareitadminmodel = require('../models/spareitadminparkingmodel');
const parkinglotmodel = require('../models/parkinglotparkingmodel');
const servicesofferedmodule = require('../models/servicesofferedparkingmodule');
const transactionmodel = require('../models/transactionparkingmodel');
const validatetransactionmodel = require('../models/validatetransactionmodel');
const filtermodel = require('../models/filteredtransaction');

// create customer 

exports.insertcustomer = (req, res) => {


    const customerreqdata = new customermodel(req.body);


    customermodel.insertcustomerdata(customerreqdata, (err, data) => {


        if (err)
            res.send(err);
        res.send({ status: true, message: " Customer and user Created", data: data });



    });



}

// get customer data

exports.getcustomer = (req, res) => {


    customermodel.getcustomerdata((err, data) => {


        if (err)
            res.send(err);
        res.send(data);




    });


}

// get user data

exports.getuser = (req, res) => {



    usermodel.getuserdata((err, data) => {

        if (err)
            res.send(err);
        res.send(data);


    });

}

// insert data into vechile table

exports.insertvehicle = (req, res) => {

    const vehiclereqdata = new vehiclemodel(req.body);


    vehiclemodel.insertvehicledata(vehiclereqdata, (err, data) => {


        if (err)
            res.send(err);
        res.send({ status: true, message: "vehicle registered", data: data });


    });


}

// get vehicle data


exports.getvehicle = (req, res) => {

    vehiclemodel.getvehicledata((err, data) => {



        if (err)
            res.send(err);
        res.send(data);

    });
}


// create attendant

exports.createattendant = (req, res) => {

    const attenantdata = new attendantmodel(req.body);

    attendantmodel.createparkingattendant(attenantdata, (err, data) => {

        if (err)
            res.send(err);
        res.send({ status: true, message: "Attendant created", data: data });



    });



}

exports.getattendant = (req, res) => {


    attendantmodel.getatteandantdata((err, data) => {


        if (err)
            res.send(err);
        res.send(data);





    });

}

// create spareit admin

exports.createadminspareit = (req, res) => {

    const adminspareitdata = new spareitadminmodel(req.body);

    spareitadminmodel.createspareitadmin(adminspareitdata, (err, data) => {

        if (err)
            res.send(err);
        res.send({ status: true, message: "Admin  created", data: data });


    });


}


// get spareit admin data

exports.getadminspareitdata = (req, res) => {



    spareitadminmodel.getspareitadmindata((err, data) => {


        if (err)
            res.send(err);
        res.send(data);



    });


}

// create parking lot


exports.createparkinglot = (req, res) => {

    const parkinglotreqdata = new parkinglotmodel(req.body);



    parkinglotmodel.insertparkingdata(parkinglotreqdata, (err, data) => {



        if (err)
            res.send(err);
        res.send({ status: true, message: "parking lot  created", data: data });



    });



}

// get parking lot data

exports.getparkinglotdata = (req, res) => {

    parkinglotmodel.getparkingdata((err, data) => {


        if (err)
            res.send(err);
        res.send(data);

    });

}

// get offered services data

exports.getofferedservicesdata = (req, res) => {


    servicesofferedmodule.getservicesdata((err, data) => {


        if (err)
            res.send(err);
        res.send(data);

    });


}

// create transaction

exports.createtransactionIn = (req, res) => {

    const transactionreqdata = new transactionmodel(req.body);


    transactionmodel.createIntransaction(transactionreqdata, (err, data) => {

        if (err)
            res.send(err);
        res.send({ status: true, message: "Transaction Created - Vehicle In", data: data });

    });


}

// get transaction data

exports.gettransactiondata = (req, res) => {



    transactionmodel.gettransaction((err, data) => {

        if (err)
            res.send(err);
        res.send(data);

    });

}

// get data by attendant id - parking lot name for transaction

exports.getdatabyattendant = (req, res) => {

    const attendantreqdata = new transactionmodel(req.body);


    transactionmodel.getdatabyattendantid(attendantreqdata, (err, data) => {


        if (err)
            res.send(err);
        res.send(data);


    });


}

//get data by registration number - customer name for transaction 

exports.getdatabyregnumber = (req, res) => {

    const regnumberreqdata = new transactionmodel(req.body);

    transactionmodel.getdatabyregistrationnumber(regnumberreqdata, (err, data) => {

        if (err)
            res.send(err);
        res.send(data);


    });

}


// get all registration number

exports.getregnumber = (req, res) => {


    vehiclemodel.getregistrationno((err, data) => {



        if (err)
            res.send(err);
        res.send(data);

    });

}
exports.getregdatacustid = (req,res)=>{

       const vehicledata = new vehiclemodel(req.body);
       vehiclemodel.getregistrationdatacustid(vehicledata,(err,data)=>{


        if (err)
            res.send(err);
        res.send(data);

       });

}


// create  out transaction

exports.createtransactionOut = (req, res) => {

    const transactionreqdata = new transactionmodel(req.body);

    transactionmodel.createOutTransaction(transactionreqdata, (err, data) => {

        if (err)
            res.send(err);
        res.send({ status: true, message: "Transaction Created - Vehicle Out", data: data });

    });

}


// validate transaction

exports.validatetransaction = (req, res) => {

    const datareq = new validatetransactionmodel(req.body);

    validatetransactionmodel.transactionvalidation(datareq, (err, data) => {


        if (err)
            res.send(err);

        else {

            var temp = JSON.stringify(data);
            var datalist = (temp.split(','));

            if (datalist.length == 1) {

                res.send({ status: true, data: data, message: 'No record' });

            }
            else {

                res.send({ status: false, data: data, message: ' record found' });

            }
        }
    });
}

// filter transaction data

exports.filtertransaction = (req, res) => {

    const filterdata = new filtermodel(req.body);
    filtermodel.filtertransaction(filterdata, (err,data) => {

        if (err)
            res.send(err)
        res.send(data);
        
    });
}

// filter service data according to transaction id

exports.filterservice = (req,res)=>{

    const filterdata = new filtermodel(req.body);
    filtermodel.filterservices(filterdata, (err,data) => {

        if (err)
            res.send(err)
        res.send(data);
        
    });
}
// filter customername and parkinglot name according to trnasaction id
 exports.filtercustomerparkingdata = (req,res)=>{

        const filterdata = new filtermodel(req.body);
        filtermodel.filtercustomernameandparkinglotname(filterdata, (err,data) => {
            if (err)
                res.send(err)
            res.send(data);
            
        });

}


// get only customer name 
exports.getcustomername = (req,res)=>{

     customermodel.getonlycustomername((err,data)=>{

        if (err)
                res.send(err)
            res.send(data);

     });

}

// get only parking lot name

exports.getparkingname = (req,res)=>{
    parkinglotmodel.getparkinglotname((err,data)=>{

        if (err)
                res.send(err)
            res.send(data);
    });
}
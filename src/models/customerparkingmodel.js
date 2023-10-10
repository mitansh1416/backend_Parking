var dbConn = require('../../config/dbconfig');
const { use } = require('../routes/parkingroutes');

// customer model

var customermodel = function (customerdata) {

    this.CustomerName = customerdata.CustomerName;
    this.Address = customerdata.Address;
    this.Locality = customerdata.Locality;
    this.City = customerdata.City;
    this.State = customerdata.State;
    this.Pincode = customerdata.Pincode;
    this.FirstName = customerdata.FirstName;
    this.LastName = customerdata.LastName;
    this.MobileNo = customerdata.MobileNo;

}

// insert data

customermodel.insertcustomerdata = (customerreqdata, result) => {


    var value = {
        CustomerName: customerreqdata.CustomerName, Address: customerreqdata.Address, Locality: customerreqdata.Locality,
        City: customerreqdata.City, State: customerreqdata.State, Pincode: customerreqdata.Pincode, Active: "YES"
    };

    dbConn.query('insert into customerdata set ?', value, (err, res) => {

        if (err)
            result(null, err);

        var Id = res.insertId;


        var uservalue = {
            FirstName: customerreqdata.FirstName, LastName: customerreqdata.LastName, MobileNo: customerreqdata.MobileNo,
            RoleId: 2, AssignedTo: Id, Active: "YES"
        };

        dbConn.query('insert into user set ?', uservalue);



        result(null, res);

    });

}

// get data

customermodel.getcustomerdata = (result) => {


    dbConn.query('select * from customerdata', (err, res) => {

        if (err)
            result(null, err);
        result(null, res);

    });

}

// get only customer name
customermodel.getonlycustomername = (result)=>{
      dbConn.query('select CustomerId,CustomerName from customerdata',(err,res)=>{
        if (err)
           result(null, err);
        result(null,res);          
      });
}


module.exports = customermodel;
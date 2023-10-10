const dbConn = require('../../config/dbconfig');

// create spareit admin model

var spareitadmin = function (spareitadmindata) {
    this.FirstName = spareitadmindata.FirstName;
    this.LastName = spareitadmindata.LastName;
    this.MobileNo = spareitadmindata.MobileNo;

}

// Insert spareit Admin data

spareitadmin.createspareitadmin = (spareitadmindata, result) => {


    var values = { FirstName: spareitadmindata.FirstName, LastName: spareitadmindata.LastName, MobileNo: spareitadmindata.MobileNo, RoleId: 1, AssignedTo: 0, Active: "YES" };
    dbConn.query('insert into user set ?', values, (err, res) => {


        if (err)
            result(null, err);
        result(null, res);



    });
}


//get spareit admin data

spareitadmin.getspareitadmindata = (result) => {


    dbConn.query('select * from user where RoleId = 1', (err, res) => {

        if (err)
            result(null, err);
        result(null, res);

    });



}


module.exports = spareitadmin;


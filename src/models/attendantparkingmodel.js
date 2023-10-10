const dbConn = require('../../config/dbconfig');


//create attendant model

var attendantdata = function (attenantdata) {

    
    this.FirstName = attenantdata.FirstName;
    this.LastName = attenantdata.LastName;
    this.MobileNo = attenantdata.MobileNo;
    this.ParkingLotName = attenantdata.ParkingLotName;

}

// insert attendant data

attendantdata.createparkingattendant = (attendantreqdata, result) => {

    dbConn.query('select ParkinglotId from parkinglotdata where ParkingLotNAME = ?', attendantreqdata.ParkingLotName, (err, res) => {


        
        var Id = res[0]['ParkinglotId'];
        
        var values = {
            FirstName: attendantreqdata.FirstName, LastName: attendantreqdata.LastName, MobileNo: attendantreqdata.MobileNo, RoleId: 3, AssignedTo: Id, Active: 'YES'
        };

        dbConn.query('insert into user set ?', values, (err, res) => {

            if (err)
                result(null, err);
            result(null, res);

        });

    });

}

// get attendant data

attendantdata.getatteandantdata = (result)=>{


    dbConn.query('select * from user where RoleId = 3' ,(err,res)=>{

     if(err)
        result(null,err);
    result(null,res);

    });

}


module.exports = attendantdata;
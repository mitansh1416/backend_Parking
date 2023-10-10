const dbConn = require('../../config/dbconfig');
const { promise } = require('../../config/dbconfig');

//create parking lot model;

const parkinglot = function (parkinglotdata) {

  this.ParkingLotName = parkinglotdata.ParkingLotName;
  this.Address = parkinglotdata.Address;
  this.Locality = parkinglotdata.Locality;
  this.City = parkinglotdata.City;
  this.State = parkinglotdata.State;
  this.Pincode = parkinglotdata.Pincode;
  this.GPSPosition = parkinglotdata.GPSPosition;
  this.Services = parkinglotdata.Services;

}

//insert parking lot data

parkinglot.insertparkingdata = async (parkingreqdata, result) => {

    
  
 

  var values = { ParkingLotName: parkingreqdata.ParkingLotName, Address: parkingreqdata.Address, Locality: parkingreqdata.Locality, City: parkingreqdata.City, State: parkingreqdata.State, Pincode: parkingreqdata.Pincode, GPSPosition: parkingreqdata.GPSPosition, Active: "YES" };
  dbConn.query('insert into parkinglotdata set ?', values, async (err, res) => {

    if (err)
      result(null, err);
    var Id = res.insertId;
    var services = parkingreqdata.Services;
    console.log(services);
    var list = services.split(',');
    for (var i = 0; i < list.length; i++) {

      var serviceid = await new Promise((resolve, reject) => {

        dbConn.query('select ServiceId from masterservices where ServiceName = ?', list[i], (err, res) => {

          if (err) throw err
          resolve(res[0]['ServiceId']);
        });

      });
      var values = { ParkingLotId: Id, ServiceId: serviceid, TotalSlots: 0, SlotsAvailable: 0, Active: "YES" };
      dbConn.query('insert into offeredservices set ?', values);
    }

    result(null, res);

  })


}

// get parking data

parkinglot.getparkingdata = (result) => {


  dbConn.query('select * from parkinglotdata', (err, res) => {

    if (err)
      result(null, err);
    result(null, res);
  });



}

// get parking lot name
parkinglot.getparkinglotname = (result) => {
  dbConn.query('select ParkingLotId,ParkingLotName from parkinglotdata', (err, res) => {
    if (err)
      result(null, err);
    result(null,res);
  });
}

module.exports = parkinglot;
const dbConn = require('../../config/dbconfig');


// create services offered model

const servicesoffered = function (servicesoffereddata) {

    this.ParkingLotId = servicesoffereddata.ParkingLotId;
    this.ServiceId = servicesoffereddata.ServiceId;
    this.TotalSlots = servicesoffereddata.TotalSlots;
    this.SlotsAvailable = servicesoffereddata.SlotsAvailable;
    this.Active = servicesoffereddata.Active;

}

//get data


servicesoffered.getservicesdata = (result) => {

    dbConn.query('select * from offeredservices', (err, res) => {

        if (err)
            result(null, err);
        result(null, res);

    });

}




module.exports = servicesoffered;
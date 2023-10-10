const { json } = require('body-parser');
const dbConn = require('../../config/dbconfig');
const QRCode = require('qrcode');


//vehicle model

const vehiclemodel = function (vehicledata) {

    this.RegistrationNumber = vehicledata.RegistrationNumber;
    this.CustomerName = vehicledata.CustomerName;

}

// insert data

vehiclemodel.insertvehicledata = (vehiclereqdata, result) => {
    dbConn.query("select CustomerId from customerdata where CustomerName = ?", vehiclereqdata.CustomerName, async (err, res) => {


        var Id = res[0]['CustomerId'];


        var qr = await new Promise((resolve, reject) => {


            QRCode.toDataURL(vehiclereqdata.RegistrationNumber, (err, code) => {


                if (err) return console.log("error occurred")


                resolve(code);



            });

        });

        var values = { RegistrationNumber: vehiclereqdata.RegistrationNumber, CustomerId: Id, QRCode: qr, Active: "Yes" };
        dbConn.query('insert into vehicledata set  ?', values, (err, res) => {

            if (err)
                result(null, err);
            result(null, res);

        });

    });


}

//get data

vehiclemodel.getvehicledata = (result) => {

    dbConn.query('select * from vehicledata', (err, res) => {


        if (err)
            result(null, err);
        result(null, res);

    });
}

// get registration number
vehiclemodel.getregistrationno = (result) => {


    dbConn.query('select RegistrationNumber from vehicledata', (err, res) => {



        if (err)
            result(null, err);
        result(null, res);



    });



}


// get registration data according to customer id;

vehiclemodel.getregistrationdatacustid = (data,result)=>{



    dbConn.query('select CustomerId from customerdata where CustomerName = ?',data.CustomerName,(err,res)=>{


        var custId = res[0]['CustomerId'];

        dbConn.query(' select RegistrationNumber,QRCode  from vehicledata where Customerid= ? ',custId,(err,res)=>{

            if (err)
               result(null, err);
           result(null, res);
        
           });

    });

  
}

module.exports = vehiclemodel;
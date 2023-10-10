const { promise, threadId } = require('../../config/dbconfig');
const dbConn = require('../../config/dbconfig');

// transaction model

const transactionmodel = function (transactiondata) {
    this.RegistrationNumber = transactiondata.RegistrationNumber;
    this.InAttendantId = transactiondata.InAttendantId;
    this.InDateTime = transactiondata.InDateTime;
    this.ServiceName = transactiondata.ServiceName;
    this.OutAttendantId = transactiondata.OutAttendantId;
    this.OutDateTime = transactiondata.OutDateTime;
}

//create In transaction

transactionmodel.createIntransaction = async (transactionreqdata, result) => {

    var parkinglotid = await new Promise((resolve, reject) => {
        dbConn.query('Select AssignedTo from user where UserId = ?', transactionreqdata.InAttendantId, (err, res) => {

            resolve(res[0]['AssignedTo']);
        })
    });
    var values = { ParkingLotId: parkinglotid, RegistrationNumber: transactionreqdata.RegistrationNumber, InDateTime: transactionreqdata.InDateTime, OutDateTime: null, InAttendantId: transactionreqdata.InAttendantId, OutAttendantId: null };
    dbConn.query('insert into transaction SET ?  ', values, async (err, res) => {


        var Id = res.insertId;
        var services = transactionreqdata.ServiceName;
        var list = services.split(',');
        for (var i = 0; i < list.length; i++) {
            dbConn.query('select ServiceId from masterservices where ServiceName = ?', list[i], (err, res) => {
                if (err)
                    result(null, err);
                var serviceid = res[0]['ServiceId'];
                var values = { TransactionId: Id, ServiceId: serviceid };
                dbConn.query('insert into availedservices set ?', values);
            });
        }
        result(null, res);
    });


}

//get parking lot data according to attendant id
transactionmodel.getdatabyattendantid = async (InAttendantId, result) => {


    dbConn.query('Select AssignedTo from user where UserId = ?', InAttendantId.InAttendantId, (err, res) => {
        var parkinglotid = (res[0]['AssignedTo']);
        dbConn.query('select ParkingLotName,Address from parkinglotdata where ParkingLotId = ?', parkinglotid, (err, res) => {

            if (err)
                result(null, err);
            result(null, res);

        });
    });



}
// get customer name from registration Number
transactionmodel.getdatabyregistrationnumber = (RegistrationNumber, result) => {

    dbConn.query('select CustomerId from vehicledata where RegistrationNumber = ?', RegistrationNumber.RegistrationNumber, (err, res) => {
        var id = res[0]['CustomerId'];
        dbConn.query('select CustomerName from customerdata where CustomerId = ? ', id, (err, res) => {
            if (err)
                result(null, res);
            result(null, res);
        });
    });

}

//get transaction data

transactionmodel.gettransaction = (result) => {


    dbConn.query('select * from transaction', (err, res) => {


        if (err)
            result(null, err);
        result(null, res);

    });
}


// create out transaction

transactionmodel.createOutTransaction = async (transactionreqdata, result) => {


    var parkinglotid = await new Promise((resolve, reject) => {
        dbConn.query('Select AssignedTo from user where UserId = ?', transactionreqdata.OutAttendantId, (err, res) => {
            if (err)
                throw err;
            resolve(res[0]['AssignedTo']);
        })
    });

    var values = { OutDateTime: transactionreqdata.OutDateTime, OutAttendantId: transactionreqdata.OutAttendantId };

    dbConn.query('update transaction set ? where ParkingLotId = ? and RegistrationNumber = ? and OutDateTime is null', [values, parkinglotid, transactionreqdata.RegistrationNumber], async (err, res) => {


        if (err)
            result(null, err);
        result(null, res);



    });
}


module.exports = transactionmodel;


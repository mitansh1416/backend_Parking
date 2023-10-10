const dbConn = require("../../config/dbconfig");

const validationdata = function (validationdata) {
     this.RegistrationNumber = validationdata.RegistrationNumber;
     this.AttendantId = validationdata.AttendantId;

}


validationdata.transactionvalidation = (datareq, result) => {


     dbConn.query('select AssignedTo from user where UserId = ?', datareq.AttendantId, (err, res) => {


          var id = res[0]['AssignedTo'];
          var no = datareq.RegistrationNumber;
          var values = [ no, id ];
          dbConn.query('select * from transaction where RegistrationNumber= ? and ParkingLotId = ? and InDateTime is not null and OutDateTime is null' , values, (err, res) => {

               if (err)
                    result(null, err);
               result(null, res);

          });



     });


}

module.exports = validationdata;
const dbConn = require('../../config/dbconfig');

const filtermodel = function (filterdata) {
     this.ParkingLotName = filterdata.ParkingLotName;
     this.CustomerName = filterdata.CustomerName;
     this.StartDate = filterdata.StartDate;
     this.EndDate = filterdata.EndDate;
     this.TransactionId = filterdata.TransactionId;
}

filtermodel.filtertransaction = async (datareq, result) => {

     if (datareq.ParkingLotName !== 'All') {
          var parkinglotid = await new Promise((resolve, reject) => {

               dbConn.query('select ParkingLotId from parkinglotdata where ParkingLotName = ?', datareq.ParkingLotName, (err, res) => {

                    if (err) throw err
                    resolve(res[0]['ParkingLotId']);
               });

          });
     }
     if (datareq.CustomerName !== 'All') {
          var customerid = await new Promise((resolve, reject) => {

               dbConn.query('select CustomerId from customerdata where CustomerName = ?', datareq.CustomerName, (err, res) => {

                    if (err) throw err
                    resolve(res[0]['CustomerId']);
               });

          });
     }
     if (datareq.ParkingLotName == 'All' && datareq.CustomerName == 'All') {

          values = [datareq.StartDate, datareq.EndDate];
          dbConn.query('select TransactionId,RegistrationNumber,InDateTime,OutDateTime from transaction where  date(OutDateTime) between date(?) and date(?)', values, (err, res) => {

               if (err)
                    result(null, err);
               result(null, res);

          });
     }
     else if (datareq.ParkingLotName !== 'All' && datareq.CustomerName == 'All') {

          values = [parkinglotid, datareq.StartDate, datareq.EndDate];
          dbConn.query('select TransactionId,RegistrationNumber,InDateTime,OutDateTime from transaction where ParkingLotId = ? and date(OutDateTime) between date(?) and date(?)', values, (err, res) => {

               if (err)
                    result(null, err);
               result(null, res)

          });


     }
     else if (datareq.ParkingLotName == 'All' && datareq.CustomerName !== 'All') {

          values = [customerid, datareq.StartDate, datareq.EndDate];
          dbConn.query('select TransactionId,RegistrationNumber,InDateTime,OutDateTime from transaction where  RegistrationNumber in (select RegistrationNumber from vehicledata where CustomerId = ?) and date(OutDateTime) between date(?) and date(?)', values, (err, res) => {

               if (err)
                    result(null, err);
               result(null, res)

          });



     }
     else if (datareq.ParkingLotName !== 'All' && datareq.CustomerName !== 'All') {


          values = [parkinglotid, customerid, datareq.StartDate, datareq.EndDate];
          dbConn.query('select TransactionId,RegistrationNumber,InDateTime,OutDateTime from transaction where   ParkingLotId = ? and RegistrationNumber in (select RegistrationNumber from vehicledata where CustomerId = ?) and date(OutDateTime) between date(?) and date(?)', values, (err, res) => {

               if (err)
                    result(null, err);
               result(null, res)

          });




     }

}

filtermodel.filterservices = (datareq, result) => {


     dbConn.query('select ServiceName from masterservices m join availedservices a on m.ServiceId = a.ServiceId join transaction t on a.TransactionId = t.TransactionId where a.TransactionId= ?', datareq.TransactionId, (err, res) => {

          if (err)
               result(null, err);
          
          var temp = [];
          for(var i=0;i<res.length;i++)
          {
               temp.push(res[i]['ServiceName']);
          }
          var data = [{ServiceName:temp.toString()}] ;
          result(null, data)

     });


}

filtermodel.filtercustomernameandparkinglotname =async (datareq, result) => {

 
     var parkinglotid = await new Promise((resolve, reject) => {

          dbConn.query('select ParkingLotId from transaction where TransactionId = ?', datareq.TransactionId, (err, res) => {

               if (err) throw err
               resolve(res[0]['ParkingLotId']);
          });

     });
    
     var regno  = await new Promise((resolve, reject) => {

          dbConn.query('select RegistrationNumber from transaction where TransactionId = ?', datareq.TransactionId, (err, res) => {

               if (err) throw err
               resolve(res[0]['RegistrationNumber']);
          });

     });
     
     var custid =  await new Promise((resolve, reject) => {

          dbConn.query('select CustomerId from vehicledata where RegistrationNumber = ?', regno, (err, res) => {

               if (err) throw err
               resolve(res[0]['CustomerId']);
          });

     });
     
     var parkingname = await new Promise((resolve, reject) => {

          dbConn.query('select ParkingLotName from parkinglotdata where ParkingLotId = ?', parkinglotid, (err, res) => {

               if (err) throw err
               resolve(res[0]['ParkingLotName']);
          });

     });
     
     var customername = await new Promise((resolve, reject) => {

          dbConn.query('select CustomerName from customerdata where CustomerId = ?', custid, (err, res) => {

               if (err) throw err
               resolve(res[0]['CustomerName']);
          });

     });
     
     var data = [{CustomerName:customername,ParkingLotName:parkingname}];
    
     result(null,data);
}


module.exports = filtermodel;
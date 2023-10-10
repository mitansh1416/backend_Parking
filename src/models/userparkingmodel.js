var dbConn = require('../../config/dbconfig');

// user model

var usermodel = function (userdata) {

    this.FirstName = userdata.FirstName;
    this.LastName = userdata.LastName;
    this.MobileNo = userdata.MobileNo;
    this.RoleId= userdata.RoleId;
    this.AssignedTo =userdata.AssignedTo 
    this.Active = userdata.Active;
}

//get data

usermodel.getuserdata = (result)=>{

    dbConn.query('select * from user', (err, res) => {

        if (err)
            result(null, err);
        result(null, res);

    });

}



module.exports = usermodel;
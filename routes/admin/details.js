const express = require('express');
var router = express.Router();
const con = require("../../configs/DBConnection");
const mysql = require('mysql');

router.get("/details",function(req,res) {
  var query = "SELECT * FROM webdetail";
  con.query(query,function(err,respond) {
    if(err) throw err;
    res.render("admin/details.ejs",{data:respond});
  });
});
router.post("/details",function(req,res) {
  var email = req.body.email;
  var contact = req.body.contact;
  var address = req.body.address;
  var query = "SELECT * FROM webdetail";
  con.query(query,function(err,respond) {
    if(err) throw err;
    if(respond.length == 0){
      var insertquery = "INSERT INTO webdetail (email,contact,address) VALUES (?, ?, ?)";
      var query = mysql.format(insertquery,[email,contact,address]);

      con.query(query, function (err, result) {
       if (err) throw err;
       // console.log(result);
        res.redirect("/admin/details");
       });
    }else{
      var query = "UPDATE webdetail SET email = ?,contact = ?, address = ? WHERE id = ?";
      con.query(query,[email,contact,address,1],function(err,respond) {
         if(err) throw err;
         res.redirect("/admin/details");
      });
    }
  });

});


module.exports = router;

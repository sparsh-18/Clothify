const express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var con = require('../../configs/DBConnection');


router.get("/", function(req,res) {
  console.log(req.session);
  if(req.session.admin != undefined && Object.keys(req.session.admin).length !=0) {
    if(req.session.admin.u == "root") {
      res.render("admin/panel.ejs");
    } else if(req.session.admin.u == "g") {
      res.render("admin/secpanel.ejs");
    }
  } else {
    res.redirect("/admin/adminlogin");
  }
});


router.get("/adminlogin",function(req,res) {
  res.render("admin/login.ejs");
});
router.post("/adminlogin",function(req,res) {
  // console.log(req.body);
  if(req.body.username == process.env.adminname && req.body.password == process.env.adminpassword){
    req.session.admin = {u: "root"};
    res.redirect("/admin");
    // res.render("admin/panel.ejs");
  }else{
    var query = "SELECT * FROM admin WHERE username = ?";
    con.query(query,[req.body.username],function(err,data) {
      if(err) throw err;
      if(data.length != 0) {
        // console.log(data[0].password);
       bcrypt.compare(req.body.password, data[0].password, function(err, resp) {
          if(err) throw err;
          if(resp)
            req.session.admin = {u: "g"};
          res.redirect("/admin");
        });
      }
    });
  }
});
router.post("/admincreate",function(req,res) {
  var usrname = req.body.username;
  var password = req.body.password;
  let salt =  bcrypt.genSaltSync(10);
  var newpassword =  bcrypt.hashSync(password, salt);
  var insertquery = "INSERT INTO admin (username, password) VALUES (?,?)";
  var query = mysql.format(insertquery,[usrname,newpassword]);

  con.query(query, function (err, result) {
     if (err) throw err;
     // console.log("1 record inserted");
      res.redirect("/admin");

     });
});

router.get("/adminlogout", function(req, res) {
  req.session.admin = {};
  res.redirect("/admin/adminlogin");
});

module.exports = router;

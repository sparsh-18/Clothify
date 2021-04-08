const express = require('express');
var router = express.Router();
const con = require("../../configs/DBConnection");
const mysql = require('mysql');
var bcrypt = require('bcryptjs');

router.get("/admindel",function(req,res) {
    if(req.session.admin.u == "root"){
      var query = "SELECT * FROM admin";
      con.query(query,function(err,respond) {
        if(err) throw err;
        res.render("admin/adminuser.ejs",{data:respond});
      });
    } else {
      res.redirect("/admin");
    }
});
router.post("/admindel",function(req,res) {
  delid = req.body.id;
  var query = "DELETE FROM admin WHERE id = ?";
  con.query(query,[delid],function(err,respond) {
    if(err) throw err;
    res.redirect("/admin/admindel");
    // console.log(respond);
  })
});

router.get("/area", function(req, res) {

  if(req.session.admin != null && Object.keys(req.session.admin).length != 0) {
    con.query("SELECT * FROM delivery",function(e,del) {
      if(e) throw e;
      res.render("admin/area.ejs",{delv: del});
    })

  } else {
    res.redirect("/admin");
  }
});
router.post("/area", function(req, res) {
  con.query("INSERT INTO delivery (area, pincode) VALUES (?,?)",[req.body.area, req.body.pin], function(err) {
    if(err) throw err;
    res.redirect("/admin/area");
  });
});
router.get("/areadelete/:id", function(req, res) {
  con.query("DELETE FROM delivery WHERE id = ?",[req.params.id], function(e) {
    if(e) throw e;
    res.redirect("/admin/area");
  });
});
// router("/contact", function(req, res) {
//   if(req.session.admin != null && Object.keys(req.session.admin).length != 0) {
//     con.query("SELECT * FROM contact WHERE id = ?",[0],function(e,contact) {
//       if(e) throw e;
//       res.render("admin/contact.ejs",{contact: contact});
//     })
//
//   } else {
//     res.redirect("/admin");
//   }
// })

router.post("/adminpass/:id", function(req, res) {
  var password = req.body.pass;
  let salt =  bcrypt.genSaltSync(10);
  var newpassword =  bcrypt.hashSync(password, salt);
  con.query("UPDATE admin SET password = ? WHERE id = ?",[newpassword, req.params.id], function(err) {
      if(err) throw err;
      res.redirect("/admin/admindel");
  });
});

module.exports = router;

const express = require('express');
var router = express.Router();
const con = require("../../configs/DBConnection");
const mysql = require('mysql');

router.get("/custdel",function(req,res) {
if(req.session.admin != null && Object.keys(req.session.admin).length != 0) {
  var query = "SELECT * FROM users";
  con.query(query,function(err,respond) {
    if(err) throw err;
    res.render("admin/customer.ejs",{data:respond});
  });
} else {
  res.redirect("/admin");
}
});
router.post("/custdel",function(req,res) {
  delid = req.body.id;
  var query = "DELETE FROM users WHERE id = ?";
  con.query(query,[delid],function(err,respond) {
    if(err) throw err;
    res.redirect("/admin/custdel");
    // console.log(respond);
  })
});


module.exports = router;

const express = require('express');
var router = express.Router();
const con = require("../../configs/DBConnection");
const mysql = require('mysql');

router.get("/orderapprove", function(req, res) {

  if(req.session.admin != undefined && Object.keys(req.session.admin).length !=0) {

      con.query("SELECT * FROM orderhistory WHERE status = ?",["n"],function(er, resp) {
        if(er) throw er;
        var p = [];
        resp.forEach((item, i) => {
          var c = 0;
          var prod = item.products.split(" ").map(Number).splice(1);
          var qt = item.qty.split(" ").map(Number).splice(1);
        //  console.log(prod);
          var qqq = {
            oid: item.id,
            ordercode: item.orderid,
            user: item.userid,
            date: item.date,
            pr: prod,
            qq: qt
          }
          p.push(qqq);
        });

        con.query("SELECT * FROM product", function(er, products) {
          if(er) throw er;
          con.query("SELECT * FROM users", function(err, user) {
            if(err) throw err;
            res.render("admin/order.ejs",{p:p, products: products, users: user});
          });
        });
    //    console.log(p);
      });
  } else {
    res.redirect("/admin/adminlogin");
  }

});

router.get("/approve/:oid", function(req, res) {
  if(req.session.admin != undefined && Object.keys(req.session.admin).length !=0) {
      con.query("SELECT * FROM orderhistory WHERE id = ?",[req.params.oid], function(err, resp) {
        if(err) throw err;
        var products_array = resp[0].products.split(" ").map(Number).splice(1);
        var qt_array = resp[0].qty.split(" ").map(Number).splice(1);
        products_array.forEach((product, i) => {
          con.query("UPDATE product SET stock = stock - ? WHERE id = ?",[qt_array[i], product], function(err){
            if(err) throw err;
          });
        });

      });
      con.query("UPDATE orderhistory SET status = ? WHERE id = ?",["a",req.params.oid], function(err) {
        if(err) throw err;
      });
      res.redirect("/admin/orderapprove");
  } else {
      res.redirect("/admin/adminlogin");
  }

});

router.get("/decline/:oid", function(req, res) {
  if(req.session.admin != undefined && Object.keys(req.session.admin).length !=0) {
      con.query("DELETE FROM orderhistory WHERE id = ?",[req.params.oid], function(err) {
          if(err) throw err;
      });
        res.redirect("/admin/orderapprove");
  } else {
        res.redirect("/admin/adminlogin");
  }

});

module.exports = router;

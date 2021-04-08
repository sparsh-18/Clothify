const express = require('express');
var router = express.Router();
const con = require("../../configs/DBConnection");
const mysql = require('mysql');
var path = require("path");
//**************************************************************************
//**************************************************************************
router.get("/addproduct",function(req,res) {
  if(req.session.admin != undefined && Object.keys(req.session.admin).length !=0) {

    con.query("SELECT * FROM product",function(e,r) {
      if(e) throw e;
      res.render("admin/addproduct.ejs",{uploadstatus:"", products: r});
    })

  } else {
    res.redirect("/admin/adminlogin");
  }
});
router.post("/addproduct",function(req,res) {
  var totalimg ;
  console.log(req.files.prodimg1);
  // save into product table on commercialweb database
  var prodname = req.body.pname;
  // var prodprice = req.body.prodprice;
  // var prodcategory = req.body.prodcategory;
  var description = req.body.desc;
  var stck = req.body.stock;
  // var unit = req.body.unit;
  // var mrp = req.body.mrp;
  var nameimg1 = "";
  var nameimg2 = "";
  var nameimg3 = "";
  if(!req.files.prodimg1){
    res.send("please insert image 1");
  }
  else{
    // variable to handle image : 1
    var nameimg1 = req.files.prodimg1.name;
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.prodimg1;
    // Use the mv() method to place the file somewhere on your server
    var dirpath = "../../public/upload/product/"+nameimg1;
    sampleFile.mv(path.join(__dirname,dirpath), function(err) {

        if (err){
        return res.status(500).send(err);
        // console.log("some err");
      }
        // successupload  = "Sucessfully Upload Your Post";
        totalimg = 1;
    });
  }
  if(req.files.prodimg2){
    // variable to handle image : 2
    var nameimg2 = req.files.prodimg2.name;
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.prodimg2;
    // Use the mv() method to place the file somewhere on your server
    var dirpath = "../../public/upload/product/"+nameimg2;
    sampleFile.mv(path.join(__dirname,dirpath), function(err) {

        if (err)
        return res.status(500).send(err);
        // successupload  = "Sucessfully Upload Your Post";
        totalimg ++;
    });
  }
  if(req.files.prodimg3){
    // variable to handle image : 3
    var nameimg3 = req.files.prodimg3.name;
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.prodimg3;
    // Use the mv() method to place the file somewhere on your server
    var dirpath = "/public/upload/product/"+nameimg3;
    sampleFile.mv(path.join(__dirname+dirpath),function(err) {

        if (err)
        return res.status(500).send(err);
        // successupload  = "Sucessfully Upload Your Post";
        totalimg ++;
    });
  }

  // insert data into product table
  var insertquery = "INSERT INTO product (name,image1, image2, image3,description, stock,tag, code) VALUES (?,?, ?, ?, ?, ?, ?, ?)";
  var query = mysql.format(insertquery,[prodname, nameimg1, nameimg2, nameimg3, description, stck,req.body.tag, req.body.code]);

  con.query(query, function (err, result) {
   if (err) throw err;
   // console.log("1 record inserted into product table");
   // status = "success"
   });

   // res.send(totalimg);
   res.redirect("/admin/addproduct");
});

router.post("/editproductstock/:id", function(req, res) {
  var newstock = req.body.newstock;
  con.query("UPDATE product SET stock = ? WHERE id = ?",[newstock, req.params.id], function(er) {
    if (er) {
      throw er;
    }
    res.redirect("/admin/addproduct");
  });
});

router.get("/productdelete/:id", function(req, res) {
  if(req.session.admin != undefined && Object.keys(req.session.admin).length !=0) {
      con.query("DELETE FROM product WHERE id = ?", [req.params.id], function(er) {
        if(er) throw er;
        res.redirect("/admin/addproduct");
      });
  } else {
    res.redirect("/admin");
  }

});
module.exports = router;

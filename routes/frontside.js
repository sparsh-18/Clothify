const express = require('express');
var router = express.Router();
const con = require("../configs/DBConnection");
const mysql = require('mysql');
var Cart = require("../services/cart");
var loginController = require("../controllers/loginController");

router.get("/", function(req, res) {
  con.query("SELECT * FROM product WHERE tag = ? LIMIT 8",["a"],function(e,newarrival) {
    if(e) throw e;
    con.query("SELECT * FROM product WHERE tag = ?",["b"], function(er,bestseller){
      if(er) throw er;
        res.render("frontside/home.ejs",{newarrival: newarrival, bestseller: bestseller});
    });
  });

});

router.get("/allproducts", function(req, res) {
  con.query("SELECT * FROM product", function(err, result) {
    if(err) throw err;
    res.render("frontside/allproducts.ejs", {products: result});
  })

});

//cart code -----------------------------

router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart : {});
      var products = [];

      con.query("SELECT * FROM product WHERE id = ?",[productId], function (err, product) {
           if (err) throw err;
        //   products = result;
            if(product.length >0){
            if(product[0].stock <=0){
                  console.log("Out of stock!");
                  //res.redirect("/shopping-cart");
            }else {

                cart.add(product[0], product[0].id);
                req.session.cart = cart;
            }}

                //console.log(req.session.cart.items[productId].item.unit);
      	    res.redirect("/shopping-cart");

      });
});

router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('frontside/cart.ejs', {products: null});
   }
    var cart = new Cart(req.session.cart);

    res.render('frontside/cart.ejs', {products: cart.generateArray(), totalQty: cart.totalQty});
});

router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});


    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/add/:id', function(req, res, next) {
    var productId = req.params.id;
    console.log(req.session.cart);
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.addByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});


    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

router.get("/checkout", loginController.checkLoggedIn, function(req, res) {
  const user = req.session.passport.user;
  con.query("SELECT pincode FROM users WHERE id = ?",[user], function(err, resp) {
    var p = resp[0].pincode;
    con.query("SELECT * FROM delivery WHERE pincode = ?",[p], function(err,r) {
      if(err) throw err;
      if(r.length == 0) {
          res.render("frontside/sorry.ejs");

      } else {
          const d = new Date();

          var n = Object.keys(req.session.cart.items);
          var prods = "";
          var qty = "";
          n.forEach((index, i) => {
            prods = prods +" "+req.session.cart.items[index].item.id;
            qty = qty+" "+req.session.cart.items[index].qty;
          });
          const order = ""+user + d.getDate() + d.getMonth() + d.getYear() + d.getHours() + d.getMinutes() + d.getSeconds();
          con.query("INSERT INTO orderhistory (orderid, userid, products, qty) VALUES (?,?,?,?)", [order, user, prods,qty], function(err){
            if(err) throw err;
          });
          req.session.cart = {};
          res.render("frontside/checkout.ejs");

      }
    })
  });

});
router.get("/profile", loginController.checkLoggedIn, function(req,res){
  var id =  req.session.passport.user;
  // console.log(d);
  var query = "SELECT * FROM users WHERE id = ?";
  con.query(query,[id],function(err,respond) {
    if(err) throw err;
    con.query("SELECT * FROM orderhistory WHERE userid = ?",[id],function(er, his) {
      if(er) throw er;
      con.query("SELECT * FROM product", function(e, products) {
        if(e) throw e;
            res.render("frontside/profile.ejs",{data:respond, his: his, products: products});
      });

    })

  });
});
router.post("/profilen",function(req,res) {
  var query = "UPDATE users SET fullname = ? WHERE id = ?";
  con.query(query,[req.body.name,req.body.id],function(err,respond) {
      if(err) throw err;
      res.redirect("/profile");
  });
});
router.post("/profilea",function(req,res) {
  var query = "UPDATE users SET address = ? WHERE id = ?";
  con.query(query,[req.body.address,req.body.id],function(err,respond) {
      if(err) throw err;
      res.redirect("/profile");
  });
});
router.post("/profilepin",function(req,res) {
  var query = "UPDATE users SET pincode = ? WHERE id = ?";
  con.query(query,[req.body.pincode,req.body.id],function(err,respond) {
      if(err) throw err;
      res.redirect("/profile");
  });
});
module.exports = router;

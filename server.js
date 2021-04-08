const express = require('express');
const configViewEngine = require("./configs/viewEngine");
var DBConnection = require("./configs/DBConnection");
var initWebRoutes = require("./routes/web");
// var homePageController =  require("./controllers/homePageController");
var registerController = require("./controllers/registerController");
var loginController = require("./controllers/loginController");
var auth = require("./validation/authValidation");
// var path = require("path");
const bodyParser = require("body-parser");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var connectFlash = require('connect-flash');
const upload = require('express-fileupload');
let app = express();
require('dotenv').config();
//use cookie parser
app.use(cookieParser('secret'));

var MySQLStore = require('express-mysql-session')(session);
var options = {
    host:'localhost',
    user:'root',
    password:"",
    database:"elaxirdb"
};

var sessionStore = new MySQLStore(options);

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));


app.use(function(req, res, next) {
  res.locals.cart = req.session.cart;
  next();
});

app.use(function(req, res, next) {
  res.locals.user = req.session.passport;
  next();
});
app.use(function(req,res,next) {
  var query = "SELECT * FROM webdetail";
  DBConnection.query(query,function(err,respond) {
    if(err) throw err;
    res.locals.email = respond[0].email;
    res.locals.contact = respond[0].contact;
    res.locals.address = respond[0].address;
  });
  next();
});

app.use(function(req, res, next) {
  DBConnection.query("SELECT * FROM orderhistory WHERE status = ?",["n"], function(e, resp){
    if(e) throw e;
    res.locals.orders = resp.length;
    next();
  });
})
// app.use(function(req, res, next) {
//   con.query("SELECT * FROM headers",function(err, resp){
//     var c = resp[0].contact;
//     var em = resp[0].email;
//     res.locals.contact = c;
//     res.locals.mail = em;
//     next();
//   });
//   // next();
// });


app.use(upload());
// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config view engine
configViewEngine(app);
// app.set("view engine", "ejs");
//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);
// **********************************************************************

// admin area
var adminlogin = require("./routes/admin/login");
app.use('/admin',adminlogin);

// ***********************************************************************

// admin addproduct
var addproduct = require("./routes/admin/addproduct");
app.use("/admin",addproduct);
// end
var orderapprove = require("./routes/admin/orders");
app.use("/admin",orderapprove);
// ************************************* End ******************************
// customer
var customer = require("./routes/admin/customer");
app.use("/admin",customer);
// END
// admin user
var adminuser = require("./routes/admin/admin");
app.use("/admin",adminuser);
// END
// admin details
var details = require("./routes/admin/details");
app.use("/admin",details);
// END
var front = require("./routes/frontside");
app.use("/",front);

app.listen(3000, () => console.log("server started"));

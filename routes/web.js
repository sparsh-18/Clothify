const express = require("express");
// var homePageController =  require("../controllers/homePageController");
var registerController = require("../controllers/registerController");
var loginController = require("../controllers/loginController");
var auth = require("../validation/authValidation");
var passportLocal = require("passport-local");
var passport = require('passport');
var initPassportLocal = require("../controllers/passportLocalController");

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.get("/logout", loginController.postLogOut);
    return app.use("/", router);
};
module.exports = initWebRoutes;

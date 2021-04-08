var passportLocal = require("passport-local");
var passport = require('passport');
var loginService = require("../services/loginService");

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
            usernameField: 'phone',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, phone, password, done) => {
            try {
                await loginService.findUserByPhone(phone).then(async (user) => {
                    if (!user) {
                        return done(null, false, req.flash("errors", `This user doesn't exist`));
                    }
                    if (user) {
                        let match = await loginService.comparePassword(password, user);
                        if (match === true) {
                            return done(null, user, null)
                        } else {
                            return done(null, false, req.flash("errors", match)
                            )
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
      if(user != undefined)
          return done(null, user);
        else
          return done(null, null);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;

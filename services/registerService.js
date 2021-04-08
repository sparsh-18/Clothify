var DBConnection = require("../configs/DBConnection");
var bcrypt = require("bcryptjs");

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isPhoneExist = await checkExistPhone(data.phone);
        if (isPhoneExist) {
            reject(`This number "${data.phone}" already exists.`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                fullname: data.fullname,
                password: bcrypt.hashSync(data.password, salt),
                phone: data.phone,
                address: data.address,
                pincode: data.pincode
            };

            //create a new account
            DBConnection.query(
                ' INSERT INTO users set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("Create a new user successful");
                }
            );
        }
    });
};

let checkExistPhone = (phone) => {
    return new Promise( (resolve, reject) => {
        try {
            DBConnection.query(
                ' SELECT * FROM `users` WHERE `phone` = ?  ', phone,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    if (rows.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    createNewUser: createNewUser
};

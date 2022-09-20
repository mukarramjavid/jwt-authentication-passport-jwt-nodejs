const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post("/login", (req, res) => {
    let { email, password } = req.body
    let responseObj = {
        statusCode: 0,
        errorMsg: "",
        data: {}
    }

    if (email != undefined && password != undefined) {
        let DBUser = { id: "1a-2b-3c-4d-5e-6f", email: "mukarram@gmail.com", password: "123456789", role: "admin" };
        if (email === DBUser.email && password === DBUser.password) {
            responseObj.statusCode = 200
            responseObj.errorMsg = ""

            let tokenObj = generateJWTToken(DBUser)

            DBUser.token = tokenObj.JWTToken;
            DBUser.expirationDate = `${tokenObj.ExpirationDate.toLocaleDateString()} ${tokenObj.ExpirationDate.toLocaleTimeString()}`;
            DBUser.tokenType = 'Bearer';
            responseObj.data = DBUser

        } else {
            responseObj.statusCode = 404
            responseObj.errorMsg = "email/password do not match!!"
            console.log("email/password do not match!!");
        }
    }

    res.status(responseObj.statusCode).json(responseObj)
})

function generateJWTToken(user) {
    let today = new Date();
    let expirationDate = new Date(today);
    expirationDate.setMinutes(today.getMinutes() + 30)

    let payload = {
        id: user.id,
        email: user.email,
        iat: parseInt(today.getTime() / 1000, 10),
        exp: parseInt(expirationDate.getTime() / 1000, 10),
        type: config.tokenType,

    }


    let token = jwt.sign(payload, config.secretKey)
    return { JWTToken: token, ExpirationDate: expirationDate }

}

module.exports = router
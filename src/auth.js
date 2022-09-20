const passport = require("passport");
let roles = ['user', 'customer', 'sport365', 'admin']
const auth = (req, res, next) => {
    let responseObj = {
        statusCode: 0,
        errorMsg: "",
        data: {}
    }
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            responseObj.data = info.message
            responseObj.statusCode = 401
            responseObj.errorMsg = "user is not authenticated!!!!"
            return res.status(responseObj.statusCode).json(responseObj)
        } else {
            let hasRequiredRights = roles.find(r => r === user.role) != undefined ? true : false
            if (!hasRequiredRights) {
                responseObj.data = "You are not allowed to use this endpoint."
                responseObj.statusCode = 403
                responseObj.errorMsg = "Not allowed."
                return res.status(responseObj.statusCode).json(responseObj)
            }
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = auth;
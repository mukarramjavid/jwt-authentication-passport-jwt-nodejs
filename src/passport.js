const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require("passport");

const config = require('./config');


const jwtOptions = {
    secretOrKey: config.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    // console.log(payload,tokenTypes)
    try {
        if (payload.type !== config.tokenType) {
            console.log("Invalid token Type");
        }
        let user = { id: "1a-2b-3c-4d-5e-6f", email: "mukarram@gmail.com", password: "123456789", role: 'admin' };
        user = user.email === payload.email ? user : {}

        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
module.exports = {
    jwtStrategy
}
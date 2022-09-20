const express = require('express')
const app = express()
const routes1 = require("./routes/route")
const passport = require('passport');
const { jwtStrategy } = require('./passport');
const router = require('./routes/token.route');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes1);
app.use('/token', router);
app.use(passport.initialize());
passport.use('jwt', jwtStrategy)

module.exports = app;
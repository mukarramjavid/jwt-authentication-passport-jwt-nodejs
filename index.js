const express = require('express')
const app = express()
const routes1 = require("./src/routes/route")
const passport = require('passport');
const { jwtStrategy } = require('./src/passport');
const router = require('./src/routes/token.route');
const bodyParser = require('body-parser')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes1);
app.use('/token', router);
app.use(passport.initialize());
passport.use('jwt', jwtStrategy)


app.listen(2000, () => {
    console.log(`app listen on 2000 port!!!`)
})
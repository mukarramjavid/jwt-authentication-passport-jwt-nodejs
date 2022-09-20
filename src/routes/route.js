const express = require('express')
const auth = require('../auth')
const router = express.Router()


router.get("/", (req, res) => {
    res.status(200).json({
        data: "get request entertained"
    })
})
router.post("/users", auth, (req, res) => {
    let body = req.body
    res.status(200).json({
        data: "users post request entertained"
    })
})

module.exports = router
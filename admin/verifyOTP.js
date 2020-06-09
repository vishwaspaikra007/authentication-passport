const express = require('express')
const router = express.Router()
const emailsOTP = require('../database/models/emailsOTPModel')

router.post('/verifyOTP', (req,res) => {
    const otpFromMail = req.body.otp

})
module.exports = router
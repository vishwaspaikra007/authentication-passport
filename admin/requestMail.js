var nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()
const emailsOTPModel = require('../database/models/emailsOTPModel')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'whatsapplookalike007@gmail.com',
        pass: process.env.GOOGLE_AUTH_PASSWORD_FOR_APPS
    }
});


router.post('/requestMail', (req, res) => {
    const emailOTP = new emailsOTPModel()

    const OTP = parseInt(Math.random() * 1000000)
    const otpText = `${OTP} is your OTP for whatsApp look alike Email verification. valid for 2 minute sent to you at ${new Date()}`

    let mailOptions = {
        from: 'whatsapplookalike007@gmail.com',
        to: req.body.to,
        subject: req.body.subject || OTP + " OTP from whatsapp look alike",
        text: req.body.text || otpText,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('error')
        } else {
            console.log('Email sent: ' + info.response);
            emailsOTPModel.deleteOne({ email: req.body.to }).then(doc => {
                console.log(doc)
                emailOTP.email = req.body.to
                emailOTP.otp = OTP
                emailOTP.save().then(user => {
                    console.log(user._id)
                    console.log(user)
                }).catch(err => {
                    res.send(err)
                })
                res.send("email sent")
            }).catch(err => {
                res.send(err)
            })

        }
    });

})

module.exports = router
const mongoose = require('../database.config')
let schema = mongoose.Schema

const emailsOTPSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    },
    sentAt: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('emailsOTP', emailsOTPSchema)
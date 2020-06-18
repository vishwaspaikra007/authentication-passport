const mongoose = require('../database.config')
let schema = mongoose.Schema

const AuthenticatedUser = new schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    name: String,
    refreshTokens: [String],
    img: {
        type: String,
        default: "defaultImg"
    }
})
const User = mongoose.model('userPassword', AuthenticatedUser)
module.exports = User
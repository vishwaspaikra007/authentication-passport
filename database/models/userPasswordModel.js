const mongoose = require('../database.config')

const schema = {
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    name: String
}
const User = mongoose.model('userPassword', mongoose.Schema(schema))
module.exports = User
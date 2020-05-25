const mongoose = require('../database')

const schema = {
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    }
}
const User = mongoose.model('userPassword', mongoose.Schema(schema))
module.exports = User
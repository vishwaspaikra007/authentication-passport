const mongoose = require('mongoose')
const dbPath = require('./dbPath')
mongoose.connect(dbPath, {
    useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', () => {
    console.log('error occured from the database')
})

db.once('open', () => {
    console.log('successfully opened the database')
})
module.exports = mongoose
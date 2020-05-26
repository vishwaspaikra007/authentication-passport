const express = require('express')
const app = express()
const register = require('./admin/register')
const login = require('./admin/login')
const dotenv = require('dotenv')
const passport = require('./admin/passport')
const check = require('./admin/passporttest')

dotenv.config()
app.use(express.json())
app.use(passport.initialize())

app.use(register)
app.use(login)
app.use(check)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("app is listening on port", PORT)
})

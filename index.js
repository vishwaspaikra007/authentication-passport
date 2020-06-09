const express = require('express')
const app = express()
const register = require('./admin/register')
const login = require('./admin/login')
const dotenv = require('dotenv')
const passport = require('./admin/passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const post = require('./admin/post')
const requestMail = require('./admin/requestMail')

dotenv.config()
app.use(express.json())
app.use(passport.initialize())
app.use(cors(
    {origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://vishwaspaikra007.github.io', 'https://vishwas-auth.herokuapp.com'],
     credentials: true}
     ))

app.options('*', cors())  // enable pre-flight request for complex cors request for every route
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')))    
app.set('view engine', 'ejs')

app.use(register)
app.use(login)
app.use(post)
app.use(requestMail)

app.get('/',(req, res) => {
    res.render('index.ejs')
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("app is listening on port", PORT)
})

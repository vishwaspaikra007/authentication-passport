const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
const dotenv = require('dotenv')
const userPasswordModel = require('../database/models/userPasswordModel')

dotenv.config()
let options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.TOKEN_KEY

passport.use(new JwtStrategy(options, (jwt_payload, done)=> {
    userPasswordModel.findOne({_id: jwt_payload.sub}, (err, user)=> {
        console.log(user)
        const userCopy = user.toObject()
        delete userCopy.password
        console.log(userCopy)
        if(err) {
            done(err, false)
        }
        if(user) {
            done(null, userCopy)
        } else {
            done(null, false)
        }
    })
}))

module.exports = passport
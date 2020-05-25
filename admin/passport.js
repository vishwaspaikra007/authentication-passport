var passport = require('passport')
    , LocalStrategy = require('passport-local')

passport.use(new LocalStrategy({email: 'email', password: 'password'}),(username, password, done) => {

})
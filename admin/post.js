const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/check', (req, res, next)=> {
    passport.authenticate('jwt', (err, user, info) => {
        if(err) res.send("please log in")
        if(!user) res.send("please log in not user")
        if(user) res.send(user)
    })(req, res, next)
    // console.log(user)
})

module.exports = router
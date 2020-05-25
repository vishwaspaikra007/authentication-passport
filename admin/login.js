const express = require('express')
const router = express.Router()
const userPasswordModel = require('../database/models/userPasswordModel')
const bcrypt = require('bcrypt')

router.post('/login', (req, res)=> {
    userPasswordModel.findOne({email: req.body.email})
        .then(user => {
            console.log(user)
            if(user){ 
                bcrypt.compare(req.body.password, user.password, (err, result)=> {
                    if(result)
                     {
                        console.log("Welcome " + user.email + " !")
                        res.status(400).send("authorized")
                    }
                    else
                    {
                        console.log("wrong password")
                        res.status(401).send("not authorized")
                    }
                })
            } else {
                console.log("no user with this email")
            }
        })
})

module.exports = router
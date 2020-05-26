const express = require('express')
const router = express.Router()
const userPasswordModel = require('../database/models/userPasswordModel')
const bcrypt = require('bcrypt')
const signJWT = require('./jwt')

router.post('/login', (req, res)=> {
    userPasswordModel.findOne({email: req.body.email})
        .then(user => {
            console.log(user)
            if(user){ 
                bcrypt.compare(req.body.password, user.password, (err, result)=> {
                    if(result)
                     {
                        let payloadData = {
                            age: 24,
                            post: 40
                        }
                        const signedJWT = signJWT({id:user.id, payloadData: payloadData})
                        console.log("successfuly created", signedJWT)
                        res.status(201).send(signedJWT)
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
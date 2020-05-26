const express = require('express')
const router = express.Router()
const userPasswordModel = require('../database/models/userPasswordModel')
const bcrypt = require('bcrypt')
const signJWT = require('./jwt')

router.post('/register',(req, res) => {
    userPasswordModel.findOne({email: req.body.email})
        .then((user)=> {
            console.log(user)
            if(user)
                console.log("exist")
            else
            {    
                console.log("doesn't exist")
                bcrypt.hash(req.body.password, 10, (err, hash)=> {
                    userPasswordModel.create({
                        email: req.body.email,
                        password: hash
                    })
                    .then((user)=> {
                        let payloadData = {}
                        const signedJWT = signJWT({id:user.id, payloadData: payloadData})
                        console.log("successfuly created", signedJWT)
                        res.status(201).send(signedJWT)
                    })
                })
            }
        })
})

module.exports = router
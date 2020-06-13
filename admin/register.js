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
                res.send({registered: false, msg: "User already exist"})
            else
            {    
                console.log("doesn't exist")
                bcrypt.hash(req.body.PWD, 10, (err, hash)=> {
                    userPasswordModel.create({
                        email: req.body.email,
                        password: hash,
                        name: req.body.name
                    })
                    .then((user)=> {
                        let payloadData = {}
                        const signedJWT = signJWT({id:user.id, payloadData: payloadData})
                        const signedRefreshJWT = signJWT({id:user.id},"refresh")

                        const cookieOptions = {
                            httpOnly: true,
                            expires: 0 ,
                            sameSite: 'none',
                            secure: true
                        }

                        res.cookie("refreshToken",signedRefreshJWT, cookieOptions)
                        res.status(201).send({registered: true, msg:"registration successfull", signedJWT})
                    })
                })
            }
        })
})

module.exports = router
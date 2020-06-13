const express = require('express')
const router = express.Router()
const userPasswordModel = require('../database/models/userPasswordModel')
const bcrypt = require('bcrypt')
const signJWT = require('./jwt')

router.post('/login', (req, res, next)=> {
    console.log(req.body, "\n", req.cookies)
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
                        const signedRefreshJWT = signJWT({id:user.id},"refresh")

                        const cookieOptions = {
                            httpOnly: true,
                            expires: 0 ,
                            sameSite: 'none',
                            secure: true
                        }

                        // console.log("successfuly created", signedJWT, "\n", signedRefrestJWT)]
                        res.cookie("refreshToken",signedRefreshJWT, cookieOptions)
                        res.send({logedIn: true, msg:"login successfull", signedJWT})

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
const express = require('express')
const router = express.Router()
const userPasswordModel = require('../database/models/userPasswordModel')
const jwt = require('jsonwebtoken')
const signJWT = require('./jwt')
const dotenv = require('dotenv')

dotenv.config()

router.get('/refreshToken', (req, res) => {
    if (req.cookies.refreshToken) {
        console.log(req.cookies.refreshToken)
        jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_KEY, (err, data) => {
            console.log(data, data.sub)
            userPasswordModel.update({_id: data.sub}, {$pull: {refreshTokens: req.cookies.refreshToken}})
            .then(result => {
                console.log("deleted client old refresh token", result)

                let payloadData = {
                    age: 24,
                    post: 40
                }

                const signedJWT = signJWT({id: data.sub, payloadData: payloadData})
                const signedRefreshJWT = signJWT({id: data.sub},"refresh")

                const cookieOptions = {
                    httpOnly: true,
                    expires: 0 ,
                    sameSite: 'none',
                    secure: JSON.parse(process.env.PRODUCTION) ? true : false
                }

                userPasswordModel.update({_id: data.sub}, {$push: {refreshTokens: signedRefreshJWT}})
                .then(result => {
                    userPasswordModel.findById(data.sub).then(user => {
                        console.log("result", result)
                        res.cookie("refreshToken",signedRefreshJWT, cookieOptions)
                        res.send({logedIn: true, msg:"login successfull",email: user.toObject().email,  signedJWT})
                    })
                }).catch(err => {
                    console.log("error", err)
                    res.send({logedIn: true, msg:"refresh token generation failed", signedJWT})
                })

            })
            .catch(err => {
                console.log(err)
                res.status(401).send({logedIn: false, msg: "unauthorized login again"})
            })
        })
            
            
    } else {
        console.log(req.cookies)
        res.send({logedIn: false, msg:"user doesn't exist"})
    }
})
module.exports = router
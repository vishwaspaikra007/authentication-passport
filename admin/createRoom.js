const express = require('express')
const router = express.Router()
const userPasswordModel = require('../database/models/userPasswordModel')
const { v4: uuidv4 } = require('uuid');
const roomMessageSchema = require('../database/schema/roomMessageSchema')
const mongoose = require('../database/database.config')
const userInfoMetaDataModel = require('../database/models/userInfoMetaDataModel')
const groupRoomModel = require('../database/models/groupRoomModel')

router.post('/createRoom',  (req, res, next) => customPassportAuthenticate(req, res, next), (req, res) => {
    userPasswordModel.findOne({email: req.body.email})
        .then(user => {

            if(user)
            {   
                console.log("user exist ", user)
                console.log("auth user", req.user)
                let userInfo = new userInfoMetaDataModel()
                userInfoMetaDataModel.findOne({_id: req.user._id ,chats: {$elemMatch: {recipientId: user._id}}}).select('chats')
                    .then(result => {
                        console.log("find", result)
                        if(result) {
                            res.send({roomCreated: false, msg: "chat room with this user already exist"})
                        } else {
                            const chatRoomId = uuidv4()
                            const recipientId1 = req.user._id
                            const recipientId2 = user._id

                            userInfoMetaDataModel.update(
                                { _id: recipientId2}, 
                                {$push : { chats: {_id: chatRoomId, recipientId: recipientId1 }}}
                            ).then(result => {
                                console.log("user info 1" , result)
                                if(result) {
                                    userInfoMetaDataModel.update(
                                        { _id: recipientId1}, 
                                        {$push : { chats: {_id: chatRoomId, recipientId: recipientId2}}}
                                    ).then(result => {
                                        console.log("user info 2" , result)
                                        if(result) {
                                            let roomMessageModel = mongoose.model(chatRoomId, roomMessageSchema)

                                            let roomMessage = new roomMessageModel({
                                                senderId: 'bot1',
                                                senderName: 'bot2',
                                                msg: 'messages are not encrypted yet'
                                            })

                                            roomMessage.save().then(result => {
                                                console.log("after bot" + result)
                                                if(result)
                                                    res.send({roomCreated: true, msg: "room successfuly created", chatRoomId: chatRoomId, recipientId: recipientId2})
                                            }).catch(err => {
                                                res.send({roomCreated: false, msg: err})
                                            })
                                        }
                                    }).catch(err => {
                                        res.send({roomCreated: false, msg: err})
                                    })
                                }
                            }).catch(err => {
                                res.send({roomCreated: false, msg: err})
                            })
                        }
                    }).catch(err => {
                        res.send({roomCreated: false, msg: err})
                    })
            }
            else
            {   
                console.log("user doesn't exist")
                res.send({msg: "the user is not registered", err: true})    
            }
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
})


module.exports = router
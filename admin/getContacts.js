const express = require('express')
const router = express.Router()
const userInfoMetaDataModel = require('../database/models/userInfoMetaDataModel')

router.post('/getContacts', (req, res, next)=> customPassportAuthenticate(req, res, next), (req, res) => {
    userInfoMetaDataModel.findOne({_id: req.user._id}).select('chats')
        .then(user => {
            console.log("user.chats", user.chats)
            let contactsId = []
            user.chats.map(obj => {
                contactsId.push(obj.recipientId)
            })
            userInfoMetaDataModel.find({_id: {$in: contactsId}}).select('name')
                .then(usersInfo => {
                    console.log("usersInfo", usersInfo)
                    const usersInfoModified = usersInfo.map(obj => {
                        let obj2 = {
                        recipientId: obj._id,
                        ...obj.toObject()
                        }
                        delete obj2['_id']
                        return obj2
                    })
                    console.log("usersInfoModified", usersInfoModified)

                    const contacts = usersInfoModified.map(obj => ({
                        ...user.chats.find(chat => chat.recipientId === obj.recipientId && chat).toObject(), ...obj
                    }))
                    console.log("contacts", contacts)
                    res.send(contacts)
                }).catch(err => {
                    res.send(err)
                })
        }).catch(err => {
            res.send(err)
        })
})

module.exports = router
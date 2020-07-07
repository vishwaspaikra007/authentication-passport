const roomMessageSchema = require('../database/schema/roomMessageSchema')
const mongoose = require('../database/database.config')

const socketFunc = (io)=> {
    io.on('connection', (socket) => {
        console.log("new client connected", socket.id)

        io.emit('chats', "hello everyone" + socket.id)

        socket.on('joinRoom', roomId => {
            socket.join(roomId)
            console.log("joined room with id: " + roomId)
        })

        socket.on('msgToServer', data => {
            console.log('data.msg', data.msgData.msg, "\n", data.roomId, "\n", data.msgData.senderName)
            socket.broadcast.to(data.roomId).emit('msgFromServer', data)
            roomMSGModel = mongoose.model(data.roomId, roomMessageSchema)
            roomMSGModel.create(data.msgData).then(result => {
                console.log(result)
            })
        })        
        socket.on('disconnect', ()=> {
            console.log("user disconnected")
        })  

    })

    console.log("yuheee")
}

module.exports = socketFunc
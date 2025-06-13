import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
    },
})
const userSocketMap = {}
export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}
//use to store online user

io.on('connection', socket => {
    console.log('connection', socket.id)
  
    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id
  
    // Send online user list to everyone
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  
    // 💬 Handle real-time message sending
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const receiverSocketId = getReceiverSocketId(receiverId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message)
      }
    })
  
    // ❌ Handle user disconnect
    socket.on('disconnect', () => {
      console.log('disconnect', socket.id)
      delete userSocketMap[userId]
      io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
  })
  
export { io, server, app }

import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import cloudinary from '../lib/cloudinary.js'
import { io } from '../lib/socket.js'
import { getReceiverSocketId } from '../lib/socket.js'
export const getUserForSideBar = async (req, res, next) => {
    try {
        const loginUserId = req.user._id
        const filteredUser = await User.find({ _id: { $ne: loginUserId } }).select('-password')
        return res.status(200).json(filteredUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userChild } = req.params
        const myId = req.user._id
        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userChild },
                { senderId: userChild, receiverId: myId },
            ],
        })
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save()
        const receiverID = getReceiverSocketId(receiverId)
        if (receiverID) {
            io.to(receiverID).emit('newMessage', newMessage)
        }
        return res.status(201).json(newMessage)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

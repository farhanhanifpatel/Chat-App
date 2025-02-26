import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { useAuthStore } from './useAuthStore'
export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get('/message/users')
            set({ users: res.data })
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            set({ isUserLoading: false })
        }
    },
    setOnlineUsers: users => set({ onlineUsers: users }),
    getMessage: async userId => {
        set({ isMessageLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            console.log('Response:', res) // Log the full response to see its structure
            set({ messages: res.data })
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessage: async messageData => {
        const { selectedUser, message } = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
            console.log('Response:', res) // Log the full response to see its structure
            set({ message: [...message, res.data] })
        } catch (error) {
            console.log('Error:', error) // Log the error to understand its details
            toast.error(error.response?.data?.message || 'An error occurred')
        }
    },

    subScribeToMessage: () => {
        const { selectedUser } = get()
        if (!selectedUser) return
        const socket = useAuthStore.getState().socket
        socket.emit('join', selectedUser._id)
        socket.on('newMessage', newMessage => {
            if (newMessage.senderId === selectedUser._id) {
                set({ message: [...get().message, newMessage] })
            }
        })
    },
    unSubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket
        socket.off('newMessage')
    },

    setSelectedUser: selectedUser => set({ selectedUser }),
}))

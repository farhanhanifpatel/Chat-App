import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'

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
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            console.log('Response:', res) // Log the full response to see its structure
            set({ message: res })
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            set({ isUserLoading: false })
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

    setSelectedUser: selectedUser => set({ selectedUser }),
}))

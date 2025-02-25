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
            const res = await axiosInstance.get(`/messages/${userId}`)
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
            const res = await axiosInstance.post(`/messages/send${selectedUser._id}`, messageData)
            set({ message: [...message, res.data] })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    setSelectedUser: selectedUser => set({ selectedUser }),
}))

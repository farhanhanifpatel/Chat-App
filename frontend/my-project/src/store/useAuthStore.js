import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignUp: false,
    isSignIn: false,
    isCheckingAuth: true,
    onlineUsers: [], // Corrected initialization
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            get().connectSocket()
            set({ authUser: res.data })
        } catch (err) {
            console.log(err)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async data => {
        set({ isSignUp: true })
        try {
            const response = await axiosInstance.post('/auth/signup', data)
            set({ authUser: response.data })
            get().connectSocket()
            return toast.success('Account successfully created')
        } catch (err) {
            console.log(err)
            return toast.error('Account creation failed')
        } finally {
            set({ isSignUp: false })
        }
    },

    login: async data => {
        set({ isSignIn: true })
        try {
            const response = await axiosInstance.post('/auth/signin', data)
            set({ authUser: response.data })
            get().connectSocket()
            return toast.success('Account successfully login')
        } catch (err) {
            console.log(err)
            return toast.error('Login failed')
        } finally {
            set({ isSignIn: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        })
        socket.connect()
        set({ socket: socket })

        socket.on('getOnlineUsers', userIds => {
            set({ onlineUsers: userIds })
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/signout')
            set({ authUser: null })
            console.log('Account successfully logout')
            get().disconnectSocket()
            return toast.success('Account successfully logout')
        } catch (e) {
            console.log(e)
            return toast.error(e.response.data.message)
        } finally {
            set({ authUser: null })
        }
    },

    handleImageUpload: async data => {
        set({ isUpdateProfile: true }) // Show loading state
        try {
            const formData = new FormData()
            formData.append('profilePic', data.profilePic)

            const res = await axiosInstance.put('/auth/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            set({ authUser: res.data })
            toast.success('Profile picture updated')
        } catch (err) {
            console.log(err)
            toast.error(err.message || 'Error updating profile picture')
        } finally {
            set({ isUpdateProfile: false }) // Hide loading state
        }
    },
    setonlineUsers: users => set({ onlineUsers: users }),
}))

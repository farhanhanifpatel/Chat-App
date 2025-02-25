import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create(set => ({
    authUser: null,
    isSignUp: false,
    isSignIn: false,
    isCheckingAuth: true,
    onlineUser: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
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
            return toast.success('Account successfully created')
        } catch (err) {
            console.log(err)
            return toast.error('Account successfully created')
        } finally {
            set({ isSignUp: false })
        }
    },

    login: async data => {
        set({ isSignIn: true })
        try {
            const response = await axiosInstance.post('/auth/signin', data)
            set({ authUser: response.data })
            return toast.success('Account successfully login')
        } catch (err) {
            console.log(err)
            return toast.error('Account successfully login')
        } finally {
            set({ isSignIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/signout')
            set({ authUser: null })
            console.log('Account successfully logout')
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
    setOnlineUsers: users => set({ onlineUsers: users }),
}))

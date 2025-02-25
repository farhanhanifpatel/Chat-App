import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const { signUp, isSignUp } = useAuthStore()
    const validationForm = () => {
        if (!formData.fullName.trim()) return toast.error('Full Name is required')
        if (!formData.email.trim()) return toast.error('Email is required')
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid')
        if (!formData.password) return toast.error('Password is required')
        if (formData.password.length < 6) return toast.error('Password must be at least 6 characters')
        return true
    }

    const handleSubmit = e => {
        e.preventDefault()

        console.log('Validating form...') // Debugging step

        const isValid = validationForm()
        if (!isValid) {
            console.log('Form validation failed. Stopping submission.')
            return // Stop form submission if validation fails
        }

        signUp(formData) // Only runs if validation passes
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Create Account Form */}
            <div className="w-1/2 flex items-center justify-center  text-white p-8">
                <div className="w-full max-w-md">
                    <div className="text-center">
                        <div className="bg-primary/10 p-3 rounded-xl inline-block">
                            <FaUser className="text-primary text-3xl" />
                        </div>
                        <h2 className="text-2xl font-semibold mt-2">Create Account</h2>
                        <p className="text-gray-400">Get started with your free account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full px-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                        >
                            {isSignUp ? 'Signing Up...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-4">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-blue-400 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            <div className="w-1/2 flex items-center justify-center bg-gray-950 text-white p-8">
                <div className="text-center">
                    {/* Grid Skeleton Loader (Row & Column Animation) */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="w-24 h-24 bg-gray-500 rounded-lg animate-pulse"
                                style={{ animationDelay: `${Math.floor(i / 3) * 0.2 + (i % 3) * 0.5}s` }}
                            ></div>
                        ))}
                    </div>

                    {/* Text Skeleton Loader (Appears after grid) */}
                    <div className="animate-pulse">
                        <div
                            className="h-6 w-48 bg-gray-500 rounded-lg mx-auto mb-2"
                            style={{ animationDelay: '2s' }} // Appears after grid
                        >
                            Join our community
                        </div>
                        <div
                            className="h-20 w-64 bg-gray-500 rounded-lg mx-auto"
                            style={{ animationDelay: '2.5s' }} // Appears last
                        >
                            Connect with friends, share moments, and stay in touch with your loved ones.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage

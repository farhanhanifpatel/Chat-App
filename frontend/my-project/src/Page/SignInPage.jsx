import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const { login, loading } = useAuthStore() // ✅ Use single destructuring

    const validationForm = () => {
        if (!formData.email.trim()) {
            toast.error('Email is required')
            return false
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Email is invalid')
            return false
        }
        if (!formData.password) {
            toast.error('Password is required')
            return false
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return false
        }
        return true
    }

    const handleSubmit = async e => {
        e.preventDefault()

        console.log('Validating form...')
        const isValid = validationForm()
        if (!isValid) {
            console.log('Form validation failed. Stopping submission.')
            return
        }

        console.log('Form is valid, attempting login...')
        await login(formData)
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-1/2 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login<span className="text-blue-500"> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full px-10 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                value={formData.email} // ✅ Fix email binding
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
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

                    <Link
                        to="/signup"
                        className="text-sm text-center block hover:underline hover:text-blue-600 mt-2"
                    >
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                            {loading ? 'Logging in...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

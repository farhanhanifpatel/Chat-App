import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { logout, authUser } = useAuthStore()
    return (
        <header className="bg-base-100 border-b border-base-300 fixed  w-full top-0 z-40 backdrop-blur bg-base-100/80">
            <div className="container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
                {/* Left Side - Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 text-primary font-bold text-xl hover:opacity-80 transition-all"
                >
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <span>ChatApp</span>
                </Link>

                {/* Right Side - Navigation Links */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/setting"
                        className="btn btn-sm flex items-center gap-2 bg-gray-950 bg-gray-950-200 px-3 py-2 rounded-lg transition"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="hidden sm:inline">Settings</span>
                    </Link>
                    {authUser ? (
                        <>
                            <Link
                                to="/profile"
                                className="btn btn-sm flex items-center gap-2  p-5 bg-gray-950 bg-gray-950 px-3 py-2 rounded-lg transition"
                            >
                                <User className="size-5" />
                                <span className="hidden sm:inline">Profile</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="btn btn-sm flex items-center gap-2 bg-gray-950 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                            >
                                <LogOut className="size-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/signin"
                            className="btn btn-sm flex items-center gap-2 bg-gray-950 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition"
                        >
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar

import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Page/HomePage'
import SignUpPage from './Page/SignUpPage'
import SignInPage from './Page/SignInPage'
import ProfilePage from './Page/ProfilePage'
import SettingPage from './Page/SettingPage'
import { Loader } from 'lucide-react'
import { useThemeStore } from './store/useThemeStore'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
const App = () => {
    const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
    const { theme } = useThemeStore()
    console.log({ onlineUsers })
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    console.log('authUser:', authUser) // Debugging: Check if authUser is updating

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" speed="0.65s" />
            </div>
        )
    }

    return (
        <div data-theme={theme}>
            <Navbar />
            <Routes>
                <Route path="/" element={authUser ? <Home /> : <Navigate to="/signin" />} />
                <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                <Route path="/signin" element={!authUser ? <SignInPage /> : <Navigate to="/" />} />
                <Route path="/setting" element={<SettingPage />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin" />} />
            </Routes>
        </div>
    )
}

export default App

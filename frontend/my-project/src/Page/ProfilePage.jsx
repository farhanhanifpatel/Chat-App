import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'
import { useState } from 'react'
const ProfilePage = () => {
    const { authUser, handleImageUpload, isUpdateProfile } = useAuthStore()
    const [selectedImage, setSelectedImage] = useState(null)
    const updateProfilePic = async e => {
        const file = e.target.files[0] // Get the selected file
        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async () => {
            const base64Image = reader.result
            setSelectedImage(base64Image) // Update the preview image (selectedImage)
            const data = { profilePic: file }
            await handleImageUpload(data) // Handle file upload
        }
    }

    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold py-4">Profile</h1>
                        <p className="mt-2">Your profile information</p>
                    </div>
                    <div className="flex flex-col  items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImage || authUser.profilePic || '/avatar.png'}
                                alt=""
                                className="size-32 rounded-full object-cover border-4"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`absolute bottom-0  right-0 bg-base-content hover:scale-105 p-2 rounded-ful cursor-pointer transition-all duration-200 ${
                                    isUpdateProfile ? 'animate-plus' : ''
                                }`}
                            >
                                <Camera className="w-5 h-5 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    disabled={isUpdateProfile}
                                    onChange={updateProfilePic}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdateProfile
                                ? 'Uploading...'
                                : 'Click on the camera to upload a new profile picture'}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage

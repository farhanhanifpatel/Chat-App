import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

console.log('Connecting to MongoDB...', process.env.MONGODB_URL)
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

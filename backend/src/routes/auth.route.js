import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { signup, signin, signout, checkAuth, updateProfile } from '../controllers/auth.controller.js'

import multer from 'multer' // Correct ES module import

const upload = multer({ dest: 'uploads/' }) // Multer setup

const router = express.Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.post('/signout', signout)

router.put('/update-profile', protectRoute, upload.single('profilePic'), updateProfile)

router.get('/check', protectRoute, checkAuth)

export default router

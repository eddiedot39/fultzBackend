import express from 'express'
import { editUser, getUserData } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(auth, getUserData).put(auth, editUser)

export default router
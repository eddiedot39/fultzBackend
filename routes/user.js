import express from 'express'
import { getUserData } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, getUserData)

export default router
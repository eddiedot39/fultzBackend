import express from 'express'
import multer from 'multer'
import { editProfilePhoto, editUser, getUserData } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = express.Router()
const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb('invalid image file!', false);
    }
};

const uploads = multer({storage, fileFilter})

router.route('/').get(auth, getUserData).put(auth, editUser)
router.put('/profile-photo', auth, uploads.single('profile'), editProfilePhoto)
export default router
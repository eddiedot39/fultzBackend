import asyncHandler from "express-async-handler"
import cloudinary from "../helper/cloudinary.js"
import User from '../models/User.js'

export const getUserData = (req, res) => res.json(req.user)


export const editUser = asyncHandler(async (req, res) => {
  const { name, email, password, status } = req.body
  let {user} = req
  
  user.name = name  
  user.email = email
  user.status = status

  if (password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword
  }
  await user.save()
  res.json(user)
})

export const editProfilePhoto = asyncHandler(async(req, res) => {
  try {
    const {file, user} = req
    if(!file)
      throw new Error('No Image is uploaded')
    const result = await cloudinary.uploader.upload(file.path, {
      public_id: `${user._id}_profile`, width: 500, height: 500, crop: 'fill',
    })
    const updatedUser = await User.findByIdAndUpdate(user.id, {profilePhoto: result.url}).select('-password')
    res.json(updatedUser)
  } catch (error) {
   console.log(error)
  }
})

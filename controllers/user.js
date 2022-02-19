import asyncHandler from "express-async-handler"
import User from "../models/User.js"

export const getUserData = (req, res) => {
  res.json(req.user)
}

export const editUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePhotoBase64, status } = req.body

  let user = await User.findById(req.user.id)
  user.name = name
  user.email = email
  user.profilePhotoBase64 = profilePhotoBase64
  user.status = status

  if (password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword
  }
  await user.save()
  res.json(user)
})

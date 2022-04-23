import asyncHandler from "express-async-handler"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, status } = req.body
     
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400) //bad request
    throw new Error("User already exists")
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({ name, email, password: hashedPassword, status })

  if (user) {
    const token = jwt.sign({id: user.id}, process.env.TOKEN)
    res.json({token})
  } else {
    res.status(400)
    throw new Error("Invalid User Data")
  }
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({id: user.id}, process.env.TOKEN)
    res.json({token})
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})
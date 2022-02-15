import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from '../models/User.js'

export default asyncHandler(async(req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decodedValue = jwt.verify(token, 'secret')
      req.user = await User.findById(decodedValue.id).select("-password")
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error("Not authorized")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

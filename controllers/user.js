import asyncHandler from "express-async-handler";
import User from '../models/User.js'

export const getUserData = (req, res) => {
    res.json(req.user)
}
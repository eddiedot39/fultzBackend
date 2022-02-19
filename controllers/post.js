import asyncHandler from "express-async-handler"
import Post from '../models/Post.js'

export const createPost = asyncHandler(async(req, res) => {
    const {body} = req.body
    const {user} = req

    const post = await Post.create({body, user: user.id})
    res.json(post)
})

export const editPost = asyncHandler(async(req, res) => {
    const {body} = req.body
    const {postId} = req.params
    let post = await Post.findById(postId)
    if(post.user.toString() == req.user.id) {
        post.body = body
        post.date = Date.now()
        await post.save()
        res.json(post)
    } else {
        res.status(401)
        throw new Error("Unauthorized")
    }
    
})

export const deletePost = asyncHandler(async(req, res) => {
    const {postId} = req.params
    const post = await Post.findById(postId)
    if(post.user.toString() == req.user.id) {
        await post.remove()
        res.json({message: "Post successfully deleted"})
    } else {
        res.status(401)
        throw new Error("Unauthorized")
    }
})

export const getPostById = asyncHandler(async(req, res) => {
    const {postId} = req.params
    const post = await Post.findById(postId)
    if(!post) {
        res.status(404)
        throw new Error("No Post ound")
    }
    res.json(post)
})

export const getAllPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find().populate('user', 'name')
    res.json(posts)
})

export const getUserPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find({user: req.user.id})
    res.json(posts)
})
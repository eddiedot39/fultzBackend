import asyncHandler from "express-async-handler"
import Post from '../models/Post.js'

export const createPost = asyncHandler(async(req, res) => {
    const {body} = req.body
    const {user} = req

    await Post.create({body, user: user.id})

    const posts = await Post.find().sort({_id: -1}).populate('user', ['name', 'profilePhoto'])
    const userPosts = await Post.find({user: req.user.id}).populate('user', ['name', 'profilePhoto'])
    
    res.json({posts, userPosts})
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
    const post = await Post.findById(postId).populate('user', ['name', 'profilePhoto'])
    if(!post) {
        res.status(404)
        throw new Error("No Post found")
    }
    res.json(post)
})

export const getAllPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find().sort({_id: -1}).populate('user', ['name', 'profilePhoto'])
    res.json(posts)
})

export const getUserPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find({user: req.user._id}).sort({_id: -1})
    if(!posts){
        res.status(404)
        throw new Error('No Posts Found')
    }
    res.json(posts)
})
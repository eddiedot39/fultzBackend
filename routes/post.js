import express from 'express';
import { createPost, deletePost, editPost, getAllPosts, getPostById, getUserPosts } from '../controllers/post.js';
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/user', auth, getUserPosts)
router.route('/').post(auth, createPost).get(getAllPosts)
router.route('/:postId').put(auth, editPost).delete(auth, deletePost).get(auth, getPostById)

export default router
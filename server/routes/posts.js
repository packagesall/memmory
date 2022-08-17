import express from "express";

import { getPostsBySearch,getPosts,createPost,updatePost ,deletePost,likePost,getPost} from "../controllers/posts.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();
router.get('/search',getPostsBySearch)
router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
router.patch('/:id',authMiddleware, updatePost);
router.delete('/:id',authMiddleware, deletePost);
router.patch('/:id/likePost',authMiddleware, likePost);

export default router;
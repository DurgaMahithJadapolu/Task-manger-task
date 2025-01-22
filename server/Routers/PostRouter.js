// routes/post.js
const express = require('express');
const multer = require('multer');
const { createPost, getAllPosts, editPost, deletePost } = require('../Controllers/PostController');

const router = express.Router();

// Multer storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to create a new post
router.post('/create', upload.single('photo'), createPost);

// Route to get all posts
router.get('/all', getAllPosts);

// Route to edit a post
router.put('/:postId', editPost);

// Route to delete a post
router.delete('/:postId', deletePost);

module.exports = router;

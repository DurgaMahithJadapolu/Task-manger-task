// controllers/postController.js
const cloudinary = require('../config/cloudinary');
const Post = require('../Models/PostModel');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, imageUrl } = req.body;
    
        // Validate request data
        if (!title || !content || !imageUrl) {
          return res.status(400).json({ message: 'Title, content, and imageUrl are required.' });
        }
    
        // Create a new post
        const post = new Post({
          title,
          content,
          imageUrl,
        });
    
        const savedPost = await post.save(); // Save post to the database
        res.status(201).json(savedPost); // Send a success response
      } catch (error) {
        console.error('Error creating post:', error); // Log the error
        res.status(500).json({
          message: 'Error creating post',
          error: error.message || error,
        });
      }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by latest posts
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Edit a post
const editPost = async (req, res) => {
    const { postId } = req.params; // Get the post ID from the URL params
    const { caption, title, content, imageUrl } = req.body; // Get fields to update from the request body
  
    // Validate required fields
    if (!title || !content || !imageUrl) {
      return res.status(400).json({ message: 'Title, content, and imageUrl are required.' });
    }
  
    try {
      // Find the post by ID and update all fields
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { caption, title, content, imageUrl },
        { new: true, runValidators: true } // Return updated post and validate input
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error });
    }
  };
  
  

// Delete a post
const deletePost = async (req, res) => {
  const { postId } = req.params; // Get the post ID from the URL params

  try {
    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

module.exports = { createPost, getAllPosts, editPost, deletePost };

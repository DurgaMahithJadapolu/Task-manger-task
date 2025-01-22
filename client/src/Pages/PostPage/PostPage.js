// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import Header from "../../Compontents/Header/Header";
import Footer from "../../Compontents/Footer/Footer";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts/all");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create a new post
  const createPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/posts/create", formData);
      fetchPosts();
      setFormData({ title: "", content: "", imageUrl: "" });
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Update an existing post
  const updatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${currentPostId}`,
        formData
      );
      fetchPosts();
      setFormData({ title: "", content: "", imageUrl: "" });
      setEditMode(false);
      setCurrentPostId(null);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Populate form for editing
  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
    });
    setEditMode(true);
    setCurrentPostId(post._id);
    setIsPopupOpen(true);
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="app-container">
        <h1 className="app-title">Post Management</h1>
        <button className="open-popup-btn" onClick={() => setIsPopupOpen(true)}>
          Create New Post
        </button>

        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <h2>{editMode ? "Update Post" : "Create Post"}</h2>
              <form onSubmit={editMode ? updatePost : createPost}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="submit-btn">
                  {editMode ? "Update Post" : "Create Post"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="posts-container">
          <div>
            {posts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-header">
                  <h3 className="post-title">{post.title}</h3>
                  <div className="post-actions">
                    <button
                      onClick={() => handleEdit(post)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="post-image"
                  />
                </div>
                <p className="post-content">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

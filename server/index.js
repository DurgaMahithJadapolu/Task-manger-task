const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routers/UserRouter');
const postRouter = require('./Routers/PostRouter');
const taskRouter = require('./Routers/TaskRouter');

const app = express();

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Mahithkumar:Mahith123@atlascluster.ppyvcyo.mongodb.net/Taskfor-task-manger?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routers
app.use('/api/posts', postRouter); // Use post router
app.use('/api', taskRouter); // Use task router
app.use('/api/user', authRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || 'Something went wrong!',
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Define middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!, {
 dbName:'skincarehub'
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start the Express server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

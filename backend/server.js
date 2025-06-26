//server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cakeRoutes = require('./src/routes/cakeRoutes');
const { testConnection } = require('./src/config/firebase');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cakes', cakeRoutes);

// Test Firebase connection
testConnection();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
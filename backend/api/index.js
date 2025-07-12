// index.js
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const { v2: cloudinary } = require('cloudinary');
const cakeRoutes = require('../src/routes/cakeRoutes');
const { testConnection } = require('../src/config/firebase');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 🧠 Required for multipart/form-data

// Routes
app.use('/api/cakes', cakeRoutes);

app.get('/api/status', async (req, res) => {
  try {
    await testConnection();
    res.json({ status: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'not connected', error: err.message });
  }
});

app.get('/api/cloudinary-status', async (req, res) => {
  try {
    const config = cloudinary.config();
    if (!config.cloud_name || !config.api_key || !config.api_secret) {
      throw new Error('Missing Cloudinary config');
    }
    const ping = await cloudinary.api.ping();
    res.json({ status: ping.status });
  } catch (err) {
    res.status(500).json({ status: 'not connected', error: err.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app);

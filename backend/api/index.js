const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const { v2: cloudinary } = require('cloudinary');
const cakeRoutes = require('../src/routes/cakeRoutes');
const { testConnection } = require('../src/config/firebase');

const app = express();
app.use(cors());
app.use(express.json());

// 🎂 Cake routes
app.use('/api/cakes', cakeRoutes);

// ✅ Firebase connection test
app.get('/api/status', async (req, res) => {
  try {
    await testConnection();
    res.json({ status: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'not connected', error: err.message });
  }
});

// ✅ Cloudinary connection test
app.get('/api/cloudinary-status', async (req, res) => {
  try {
    const config = cloudinary.config();

    // Check if keys are present
    if (!config.cloud_name || !config.api_key || !config.api_secret) {
      throw new Error('Missing Cloudinary configuration');
    }

    // Try pinging Cloudinary API
    const ping = await cloudinary.api.ping();
    if (ping.status === 'ok') {
      res.json({ status: 'connected' });
    } else {
      throw new Error('Cloudinary ping failed');
    }

  } catch (err) {
    res.status(500).json({ status: 'not connected', error: err.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app);

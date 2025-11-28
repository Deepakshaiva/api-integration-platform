const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// routes
const authRoutes = require('./routes/authRoutes');
const integrationRoutes = require('./routes/integrationRoutes');

const app = express(); // 👈 app is created FIRST

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// health
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend running successfully',
  });
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/integrations', integrationRoutes);

module.exports = app;

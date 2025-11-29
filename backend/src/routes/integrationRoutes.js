const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');
const Integration = require('../models/Integration');

const router = express.Router();

/**
 * Create a new Integration
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, service, endpoint, method, payload } = req.body;

    const newIntegration = await Integration.create({
      name,
      service,
      endpoint,
      method: method || 'POST',
      payload,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      message: 'Integration created successfully',
      integration: newIntegration,
    });
  } catch (err) {
    console.error('Create integration error:', err.message);
    return res.status(500).json({ message: 'Could not create integration' });
  }
});

/**
 * Get all integrations created by logged-in user
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const integrations = await Integration.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    return res.json({ integrations });
  } catch (err) {
    console.error('Fetch integrations error:', err.message);
    return res.status(500).json({ message: 'Error fetching integrations' });
  }
});

/**
 * Trigger an Integration
 */
router.post('/:id/trigger', authMiddleware, async (req, res) => {
  try {
    const integration = await Integration.findById(req.params.id);

    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    if (integration.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const axiosConfig = {
      method: integration.method || 'POST',
      url: integration.endpoint,
      data: integration.payload || {},
      timeout: 5000,
    };

    let responseData;
    let status = 'failed';

    try {
      const response = await axios(axiosConfig);
      status = 'success';
      responseData = {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      status = 'failed';
      responseData = {
        message: error.message,
        statusCode: error.response?.status,
        data: error.response?.data,
      };
    }

    // Update in DB
    integration.status = status;
    integration.lastTriggeredAt = new Date();
    integration.lastResponse = responseData;
    await integration.save();

    return res.json({
      message: `Integration trigger ${status}`,
      status,
      response: responseData,
    });

  } catch (err) {
    console.error('Trigger integration error:', err.message);
    return res.status(500).json({
      message: 'Error triggering integration',
      error: err.message,
    });
  }
});

module.exports = router;

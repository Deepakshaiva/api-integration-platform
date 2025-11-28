const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Slack Notification"
    service: { type: String, required: true }, // e.g. "slack"
    endpoint: { type: String, required: true }, // e.g. webhook URL
    method: { type: String, default: 'POST', enum: ['GET', 'POST'] },

    payload: { type: Object, default: {} }, // data to send
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    lastTriggeredAt: { type: Date },
    lastResponse: { type: Object },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Integration', integrationSchema);

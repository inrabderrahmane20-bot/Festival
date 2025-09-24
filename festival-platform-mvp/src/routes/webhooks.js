const express = require('express');
const router = express.Router();

// POST /api/v1/webhooks/payment
// This endpoint simulates a payment webhook receiver.
// In a real setup you'd validate HMAC / idempotency keys and update order status.
router.post('/payment', (req,res) => {
  console.log('webhook/payment received', req.body);
  // echo back
  res.json({ received: true, note: 'MVP - webhook received (no HMAC validation implemented)' });
});

module.exports = router;

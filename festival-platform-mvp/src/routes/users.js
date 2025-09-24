const express = require('express');
const { readDB } = require('../models/db');
const router = express.Router();

router.get('/:id/orders', (req,res) => {
  const db = readDB();
  const orders = (db.orders || []).filter(o => o.user_id === req.params.id);
  res.json(orders);
});

module.exports = router;

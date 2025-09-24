const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Simple in-memory carts for MVP (not persisted)
const carts = {};

// POST /api/v1/cart
// body: { items: [ { event_id, ticket_type, qty } ], user_id? }
router.post('/', (req,res) => {
  const { items, user_id } = req.body;
  if (!items || !Array.isArray(items)) return res.status(400).json({ error: 'items required' });
  const cartId = uuidv4();
  carts[cartId] = { id: cartId, items, user_id, created_at: new Date().toISOString() };
  res.json(carts[cartId]);
});

// GET /api/v1/cart/:id
router.get('/:id', (req,res) => {
  const cart = carts[req.params.id];
  if (!cart) return res.status(404).json({ error: 'cart not found' });
  res.json(cart);
});

module.exports = router;

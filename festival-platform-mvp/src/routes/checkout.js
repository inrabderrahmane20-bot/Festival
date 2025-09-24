const express = require('express');
const { readDB, writeDB } = require('../models/db');
const { v4: uuidv4 } = require('uuid');
const { generateQrData } = require('../utils/qr');
const router = express.Router();

// POST /api/v1/checkout
// body: { cart: { items: [...] }, billing: {...}, payment_method: 'card' }
router.post('/', (req,res) => {
  const db = readDB();
  const { cart, billing, payment_method, user_id } = req.body;
  if (!cart || !Array.isArray(cart.items)) return res.status(400).json({ error: 'cart required' });
  // rudimentary stock check & total calculation
  let total_cents = 0;
  const orderItems = [];
  for (const it of cart.items) {
    const ev = db.events.find(e => e.id === it.event_id);
    if (!ev) return res.status(400).json({ error: 'event not found: ' + it.event_id });
    const tt = ev.ticket_types.find(t => t.id === it.ticket_type);
    if (!tt) return res.status(400).json({ error: 'ticket type not found' });
    if (tt.available_quantity < it.qty) return res.status(400).json({ error: 'not enough tickets' });
    // decrease quantity (simple, no concurrency safety - MVP)
    tt.available_quantity -= it.qty;
    total_cents += tt.price_cents * it.qty;
    orderItems.push({ event_id: ev.id, title: ev.title, ticket_type: tt.label, qty: it.qty, unit_price_cents: tt.price_cents });
  }
  const order = {
    id: uuidv4(),
    user_id: user_id || null,
    items: orderItems,
    total_cents,
    billing: billing || {},
    payment_method: payment_method || 'card',
    status: 'paid_simulated',
    created_at: new Date().toISOString()
  };
  // generate QR placeholder
  order.qr = generateQrData(order);
  db.orders.push(order);
  writeDB(db);
  res.json({ order, message: 'Paiement simulé (MVP). PDF/QR envoyés (simulés).' });
});

module.exports = router;

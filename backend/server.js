
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, 'data');
const eventsPath = path.join(DATA_DIR, 'events.json');
const speakersPath = path.join(DATA_DIR, 'speakers.json');

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return [];
  }
}

const EVENTS = readJSON(eventsPath);
const SPEAKERS = readJSON(speakersPath);

// Simple endpoints inspired by the cahier des charges
app.get('/api/events', (req, res) => {
  let results = EVENTS.slice();
  const { category, date, q } = req.query;
  if (category) results = results.filter(e => e.category === category);
  if (date) results = results.filter(e => e.start_datetime.startsWith(date));
  if (q) {
    const qq = q.toLowerCase();
    results = results.filter(e => (e.title + ' ' + e.short_description + ' ' + (e.tags || []).join(' ')).toLowerCase().includes(qq));
  }
  res.json(results);
});

app.get('/api/events/:id', (req, res) => {
  const id = req.params.id;
  const event = EVENTS.find(e => e.id === id);
  if (!event) return res.status(404).json({ error: 'Not found' });
  res.json(event);
});

app.get('/api/speakers', (req, res) => {
  res.json(SPEAKERS);
});

app.get('/api/speakers/:id', (req, res) => {
  const sp = SPEAKERS.find(s => s.id === req.params.id);
  if (!sp) return res.status(404).json({ error: 'Not found' });
  res.json(sp);
});

// Cart: validate quantities (simple demonstration)
app.post('/api/cart', (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items[] required' });
  // For each item, check event and ticket type availability
  const summary = [];
  for (const it of items) {
    const ev = EVENTS.find(e => e.id === it.event_id);
    if (!ev) return res.status(400).json({ error: 'Invalid event id ' + it.event_id });
    const t = ev.ticket_types.find(tt => tt.id === it.ticket_type);
    if (!t) return res.status(400).json({ error: 'Invalid ticket type ' + it.ticket_type });
    if (t.available_quantity !== null && it.qty > t.available_quantity) {
      summary.push({ ok: false, message: 'Not enough tickets for ' + ev.title });
    } else {
      summary.push({ ok: true, event: ev.title, ticket_type: t.label, qty: it.qty, unit_price: t.price_cents });
    }
  }
  res.json({ ok: true, summary });
});

// Checkout: mock payment processing and generate order + QR-like token
app.post('/api/checkout', (req, res) => {
  const { cart, customer } = req.body;
  if (!cart || !Array.isArray(cart.items)) return res.status(400).json({ error: 'cart required' });
  // In a real app: charge the card, create order, reserve tickets, send emails
  const orderId = 'ORD-' + shortid.generate().toUpperCase();
  const tickets = cart.items.map((it, i) => {
    return {
      ticket_id: 'T-' + shortid.generate().toUpperCase(),
      event_id: it.event_id,
      ticket_type: it.ticket_type,
      qty: it.qty,
      code: Buffer.from(orderId + '|' + it.event_id + '|' + i).toString('base64') // small encoded token
    };
  });
  // Simple response representing a successful payment
  res.json({
    success: true,
    order_id: orderId,
    tickets,
    message: 'Mock payment accepted (sandbox). Replace /api/checkout with a real gateway for production.'
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Objectif backend running on', PORT);
});

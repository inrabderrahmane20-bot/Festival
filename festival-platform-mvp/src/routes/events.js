// festival-platform-mvp/src/routes/events.js
const express = require('express');
const router = express.Router();

let events = require('../data/seed.json').events || [];

// GET all events (with optional search/filter)
router.get('/', (req, res) => {
  const { q, category } = req.query;
  let filtered = events;
  if (q) {
    filtered = filtered.filter(ev =>
      ev.title.toLowerCase().includes(q.toLowerCase()) ||
      ev.description.toLowerCase().includes(q.toLowerCase())
    );
  }
  if (category) {
    filtered = filtered.filter(ev => ev.category === category);
  }
  res.json(filtered);
});

// CREATE event
router.post('/', (req, res) => {
  const { title, description, category } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const newEvent = {
    id: Date.now(),
    title,
    description: description || '',
    category: category || 'general',
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// UPDATE event
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = events.findIndex(ev => ev.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });

  events[idx] = { ...events[idx], ...req.body };
  res.json(events[idx]);
});

// DELETE event
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  events = events.filter(ev => ev.id !== id);
  res.json({ success: true });
});

module.exports = router;

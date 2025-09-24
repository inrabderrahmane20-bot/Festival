// festival-platform-mvp/src/routes/speakers.js
const express = require('express');
const router = express.Router();

let speakers = require('../data/seed.json').speakers || [];

// GET all
router.get('/', (req, res) => {
  res.json(speakers);
});

// CREATE
router.post('/', (req, res) => {
  const { name, bio } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });

  const newSp = { id: Date.now(), name, bio: bio || '' };
  speakers.push(newSp);
  res.status(201).json(newSp);
});

// UPDATE
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = speakers.findIndex(sp => sp.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Speaker not found' });

  speakers[idx] = { ...speakers[idx], ...req.body };
  res.json(speakers[idx]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  speakers = speakers.filter(sp => sp.id !== id);
  res.json({ success: true });
});

module.exports = router;

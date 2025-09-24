const { writeDB } = require('./models/db');
const { v4: uuidv4 } = require('uuid');

const speaker1 = { id: uuidv4(), name: 'Claire Dupont', role: 'Journaliste', bio: 'Journaliste spécialisée en société.' };
const speaker2 = { id: uuidv4(), name: 'Antoine Martin', role: 'Chercheur', bio: 'Spécialiste des nouvelles technologies.' };

const event1 = {
  id: uuidv4(),
  slug: 'grand-quiz-du-monde',
  title: 'Le Grand Quiz du Monde',
  short_description: "Un quiz en public autour de l'actualité",
  long_description: '<p>Soirée quiz avec des invités.</p>',
  category: 'debat',
  tags: ['quiz','soirée'],
  start_datetime: '2025-09-19T20:30:00',
  end_datetime: '2025-09-19T22:30:00',
  location: { id: 'loc1', name: 'Auditorium du Monde', address: '67 Av. Pierre-Mendès-France, 75013 Paris' },
  image_url: '/public/img/event-placeholder.jpg',
  capacity: 200,
  ticket_types: [
    { id: 't1', label: 'Plein', price_cents: 1900, refundable: true, available_quantity: 200 },
    { id: 't2', label: 'Réduit', price_cents: 1500, refundable: true, available_quantity: 50 }
  ],
  speakers: [ { id: speaker1.id, name: speaker1.name, role: speaker1.role } ],
  status: 'published'
};

const event2 = {
  id: uuidv4(),
  slug: 'avenir-du-journalisme',
  title: 'L\'avenir du journalisme',
  short_description: 'Table ronde sur les nouveaux modèles',
  long_description: '<p>Débat entre professionnels.</p>',
  category: 'debat',
  tags: ['journalisme','avenir'],
  start_datetime: '2025-09-19T14:00:00',
  end_datetime: '2025-09-19T15:30:00',
  location: { id: 'loc2', name: 'Forum', address: 'Adresse du Forum' },
  image_url: '/public/img/event-placeholder.jpg',
  capacity: 150,
  ticket_types: [
    { id: 't1', label: 'Plein', price_cents: 1200, refundable: true, available_quantity: 150 },
    { id: 't2', label: 'Abonné', price_cents: 800, refundable: true, available_quantity: 50 }
  ],
  speakers: [ { id: speaker2.id, name: speaker2.name, role: speaker2.role } ],
  status: 'published'
};

const db = { events: [event1, event2], speakers: [speaker1, speaker2], users: [], orders: [] };
writeDB(db);
console.log('Seed data written to src/data/db.json');

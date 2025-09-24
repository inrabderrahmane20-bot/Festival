const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventsRoutes = require('./routes/events');
const speakersRoutes = require('./routes/speakers');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const usersRoutes = require('./routes/users');
const webhooksRoutes = require('./routes/webhooks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname,'..','public')));

// API routes 
app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/speakers', speakersRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/checkout', checkoutRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/webhooks', webhooksRoutes);

// Serve simple frontend
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'..','public','index.html'));
});

app.listen(PORT, () => {
  console.log('Festival platform MVP server started on port', PORT);
});


module.exports = app;
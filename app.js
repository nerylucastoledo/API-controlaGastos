require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const cardRoutes = require('./src/routes/cardRoutes');
const peopleRoutes = require('./src/routes/peopleRoutes');
const categorysRoutes = require('./src/routes/categorysRoutes');
const billRoutes = require('./src/routes/billRoutes');
const firebaseRoutes = require('./src/routes/firebaseRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', firebaseRoutes);
app.use('/api', userRoutes);
app.use('/api', cardRoutes);
app.use('/api', peopleRoutes);
app.use('/api', categorysRoutes);
app.use('/api', billRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://render.com:${port}`);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const cardRoutes = require('./src/routes/cardRoutes');
const peopleRoutes = require('./src/routes/peopleRoutes');
const categorysRoutes = require('./src/routes/categorysRoutes');
const firebaseRoutes = require('./src/routes/firebaseRoutes');
const verifyToken = require('./src/middleware');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', firebaseRoutes);
app.use('/api', verifyToken, userRoutes);
app.use('/api', verifyToken, cardRoutes);
app.use('/api', verifyToken, peopleRoutes);
app.use('/api', verifyToken, categorysRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
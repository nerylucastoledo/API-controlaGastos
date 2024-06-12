const express = require('express');
const { createCard } = require('../controllers/cardsController');

const router = express.Router();

router.post('/cards', createCard);

module.exports = router;
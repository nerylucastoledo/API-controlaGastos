const express = require('express');
const { getAllCards } = require('../controllers/cardsController');
const router = express.Router();

router.get('/cards', getAllCards);

module.exports = router;
const express = require('express');
const { createCard, deleteCard, updateCard } = require('../controllers/cardsController');

const router = express.Router();

router.post('/cards', createCard);
router.put('/cards', updateCard)
router.delete('/cards', deleteCard)

module.exports = router;
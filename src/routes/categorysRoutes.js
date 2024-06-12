const express = require('express');
const { createCategory } = require('../controllers/categorysController');

const router = express.Router();

router.post('/categorys', createCategory);

module.exports = router;
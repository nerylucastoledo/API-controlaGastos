const express = require('express');
const { getAllCategorys } = require('../controllers/categorysController');
const router = express.Router();

router.get('/categorys', getAllCategorys);

module.exports = router;
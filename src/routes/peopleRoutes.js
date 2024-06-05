const express = require('express');
const { getAllPeoples } = require('../controllers/peoplesController');
const router = express.Router();

router.get('/peoples', getAllPeoples);

module.exports = router;
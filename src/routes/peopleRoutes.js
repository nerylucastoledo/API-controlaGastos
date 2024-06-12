const express = require('express');
const { createPeople } = require('../controllers/peoplesController');

const router = express.Router();

router.post('/peoples', createPeople);

module.exports = router;
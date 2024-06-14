const express = require('express');
const { createPeople, updatePeople, deletPeople } = require('../controllers/peoplesController');

const router = express.Router();

router.post('/peoples', createPeople);
router.put('/peoples', updatePeople)
router.delete('/peoples', deletPeople)

module.exports = router;
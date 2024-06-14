const express = require('express');
const { getAllUsers, updateSalary } = require('../controllers/userController');
const router = express.Router();

router.get('/users', getAllUsers);
router.put('/users', updateSalary)

module.exports = router;
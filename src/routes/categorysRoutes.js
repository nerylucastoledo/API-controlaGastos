const express = require('express');
const { createCategory, updateCategory, deleteCategory } = require('../controllers/categorysController');

const router = express.Router();

router.post('/categorys', createCategory);
router.put('/categorys', updateCategory)
router.delete('/categorys', deleteCategory)

module.exports = router;
const express = require('express');
const { getAllBills, updateBill, deleteBillItem } = require('../controllers/bill');

const router = express.Router();

router.delete('/bill', deleteBillItem)
router.get('/bill', getAllBills);
router.put('/bill', updateBill)

module.exports = router;
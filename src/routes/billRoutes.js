const express = require('express');
const { getBillByUsernameAndDate, getDataChart, updateBill, deleteBillItem } = require('../controllers/billController');

const router = express.Router();

router.get('/bill', getBillByUsernameAndDate);
router.get('/bill/:username/:year', getDataChart);
router.put('/bill', updateBill)
router.delete('/bill', deleteBillItem)

module.exports = router;
const express = require('express');
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
} = require('../controllers/transactions');

const router = express.Router();

router.route('/').get(getTransactions).post(addTransaction);

router
  .route('/:id')
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;

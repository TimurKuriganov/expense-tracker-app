const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
	title: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
	amount: {
    type: Number,
    required: [true, 'Please add a number']
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

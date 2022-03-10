const Transaction = require('../models/transaction');

const getTransactions = async (req, res, next) => {
  try {
    const allTransactions = await Transaction.find();
    return res.status(200).json({
      data: allTransactions,
    });
  } catch (err) {
    return next(err);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      const err = new Error('Transaction not found');
      err.status = 404;
      throw err;
    }
    return res.status(200).json({
      transaction,
    });
  } catch (err) {
    return next(err);
  }
};

const addTransaction = async (req, res, next) => {
  try {
    const { title, amount, description } = req.body;
    if (amount === 0 || typeof +amount !== NaN) {
      const err = new Error('Your amount can not be 0 or a string');
      err.status = 400;
      throw err;
    }
    const newTransaction = await Transaction.create({
      title: title.trim(),
      amount,
      description: description.trim(),
    });
    return res.status(201);
  } catch (err) {
    return next(err);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      const err = new Error('Transaction not found');
      err.status = 404;
      throw err;
    } else {
      const { title, amount, description } = req.body;
      if (amount === 0) {
        const err = new Error('Your amount can not be 0');
        err.status = 400;
        throw err;
      }
      transaction.title = title;
      transaction.amount = amount;
      transaction.description = description;
      await transaction.save();
      return res.status(200);
    }
  } catch (err) {
    return next(err);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      const err = new Error('Transaction not found');
      err.status = 404;
      throw err;
    }
    await transaction.remove();
    return res.status(201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};

import { DELETE_TRANSACTION, ADD_TRANSACTION, GET_TRANSACTIONS, UPDATE_TRANSACTION, SORT_TRANSACTIONS } from "./actionTypes";


const deleteTransaction = id => {
  console.log('id', id);
  return {
    type: DELETE_TRANSACTION,
    payload: id
  }
}

const addTransaction = transaction => {
  console.log('newT', transaction);
  return {
    type: ADD_TRANSACTION,
    payload: transaction
  }
}

const getTransactions = allTransactions => {
  return {
    type: GET_TRANSACTIONS,
    payload: allTransactions
  }
}

const updateTransaction = transaction => {
  return {
    type: UPDATE_TRANSACTION,
    payload: transaction
  }
}

const sortTransactions = (sortBy) => {
  return {
    type: SORT_TRANSACTIONS,
    payload: sortBy
  }
}


export { deleteTransaction, addTransaction, getTransactions, updateTransaction, sortTransactions };

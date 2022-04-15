import React from 'react';
import { ADD_TRANSACTION, DELETE_TRANSACTION, GET_TRANSACTIONS, UPDATE_TRANSACTION, SORT_TRANSACTIONS } from "./actionTypes";

export const GlobalContext = React.createContext();

export const initState = {
  transactions: [],
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.reverse()
      }
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case ADD_TRANSACTION:
      return  {
        ...state,
        transactions: [ action.payload, ...state.transactions ]
      }
    case UPDATE_TRANSACTION:
      const index = state.transactions.findIndex(transaction => transaction._id === action.payload._id)
      if (index === -1) {
        console.log('not found');
        return state;
      }
      const updatedTransactions = [...state.transactions];
      updatedTransactions.splice(index, 1, action.payload)
      return {
        ...state,
        transactions: updatedTransactions
      }
    case SORT_TRANSACTIONS:
        return {
          
        }
    default: 
      return state
  }
 }

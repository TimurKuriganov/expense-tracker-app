import React, { useContext } from 'react';
import { GlobalContext } from '../context/AppReducer';

export const Balance = () => {
  const { state }  = useContext(GlobalContext);
  const { transactions } = state;

  const amounts = transactions.map(transaction => +transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
  return (
    <div className="balance">
      <h4>Your Remained Balance</h4>
      <h1 className={total > 0 ? "plus": "minus"}>{total}</h1>
    </div>
  )
}

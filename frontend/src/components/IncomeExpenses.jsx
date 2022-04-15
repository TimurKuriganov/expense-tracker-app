import React, { useContext } from 'react'
import { GlobalContext } from '../context/AppReducer';
import './IncomeExpenses.css';

const IncomeExpenses = () => {
  const { state } = useContext(GlobalContext);

  const { transactions } = state;

  const amounts = transactions.map(transaction => transaction.amount);
  console.log('amounts', amounts);

  const income = amounts
    .filter(item => +item > 0)
    .reduce((acc, item) => (acc += +item), 0)
    .toFixed(2);

  const expense = amounts
    .filter(item => +item < 0).reduce((acc, item) => (acc += item), 0) * -1;

    return (
    <div className="inc-exp-container">
      <div>
        <h4 style={{marginRight: '2rem'}}>Income</h4>
        <p className="plus" style={{marginRight: '2rem'}}>{income}</p>
      </div>  
      <div>
        <h4 style={{marginLeft: '2rem'}}>Expenses</h4>
        <p className="minus" style={{marginLeft: '2rem'}}>${expense.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default IncomeExpenses;

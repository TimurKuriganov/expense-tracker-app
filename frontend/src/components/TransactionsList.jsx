import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/AppReducer';
import { getTransactions, sortTransactions } from '../context/actionCreators';
import Transaction from './Transaction';

const TransactionsList = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/transactions?sort=${sort}`);
        if (!response.ok) {
          setIsLoading(false);
          throw await response.json();
        }
        const data = await response.json();

        setIsLoading(false);
        dispatch(getTransactions(data.allTransactions));
      } catch (err) {
        setIsLoading(false);
        setErr(err.status);
      }
    };
    fetchTransactions();
  }, [dispatch, sort]);


  const sortHandler = (e) => {
    console.log('e.target.value sortHandler', e.target.value);
    setSort(e.target.value);
  }

  return (
    <>
      <h3 style={{ marginTop: '15px', fontSize: '25px' }}>
        Recent transactions
      </h3>
      <div className="transactions-container">
        {isLoading && <p>Loading...</p>}
        {!isLoading && err && <h3>{err}</h3>}
        {!isLoading && !err && state.transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          <>
            <div className="transaction-headings">
              <div>Date</div>
              <div>Title</div>
              <div>Amount</div>
              <select onChange={sortHandler} className="select">
                <option value="all">all</option>
                <option value="income">incomes</option>
                <option value="expense">expenses</option>
              </select>
            </div>

            <ul>
              {state.transactions.map((transaction) => (
                <Transaction key={transaction._id} transaction={transaction} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default TransactionsList;

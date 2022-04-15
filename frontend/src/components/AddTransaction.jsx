import React, { useState, useContext } from 'react';
import { addTransaction } from '../context/actionCreators';
import { GlobalContext } from '../context/AppReducer';
import './AddTransaction.css';

const AddTransaction = () => {
  const { dispatch } = useContext(GlobalContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [income, setIncome] = useState(true);
  const [err, setErr] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const onSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const onSetAmount = (e) => {
    setAmount(e.target.value);
  };
  const setIncomeHandler = (e) => {
    e.preventDefault();
    setIncome((preValue) => !preValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let amountNumber;
    income ? (amountNumber = +amount) : (amountNumber = +-amount);
    const transaction = {
      title,
      amount: amountNumber,
      description,
    };
    fetch('http://localhost:5000/api/transactions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction,
      })
    })
      .then((response) => {
        if (response.status !== 201) throw response.json()
        return response.json()
      })
      .then((data) => {
        setTitle('');
        setAmount('');
        setDescription('');
        setIncome(false);
        setShowForm(false);
        dispatch(addTransaction(data.newTransaction));
      })
      .catch((err) => {
        setAmount('');
        setTitle('');
        setErr(err.message);
      });
  };
  return (
    <>
      <div className="add-form-transaction">
        <button className="btn" onClick={() => setShowForm((pre) => !pre)}>
          {!showForm ? 'Click to add new transaction' : 'Click to close form'}
        </button>
      </div>

      {err && (
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: 'red' }}
          onClick={() => setErr(null)}
        >
          Your amount can not be 0
        </button>
      )}
      {showForm && (
        <section className="form">
          <h3>Add new transaction</h3>
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                onChange={onSetTitle}
                value={title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>

              <input
                type="number"
                id="amount"
                onChange={onSetAmount}
                value={amount}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols="20"
                rows="5"
                placeholder="Not required"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="form-group">
              <button
                className="btn"
                style={{ backgroundColor: !income && 'red' }}
                onClick={setIncomeHandler}
              >
                {income ? 'income' : 'expense'}
              </button>

              <button className="btn" disabled={!title.trim() || !amount}>
                Add transaction
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default AddTransaction;

import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/AppReducer';
import {
  deleteTransaction,
  updateTransaction,
} from '../context/actionCreators';
import Modal from './Modal';

const Transaction = ({ transaction }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { dispatch } = useContext(GlobalContext);
  const [err, setErr] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState(transaction);
  // const [title, setTitle] = useState(transaction.title);
  // const [amount, setAmount] = useState(transaction.amount);
  // const [description, setDescription] = useState(transaction.description);

  const closeModal = (e) => {
    e.stopPropagation();
    setOpenModal(false);
    if (err) setErr('');
    if (isEdit) setIsEdit(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction({ ...editedTransaction, [name]: value });
  };

  const onEditHandler = (e) => {
    e.stopPropagation();
    if (
      Object.values(editedTransaction).join(' ') !==
      Object.values(transaction).join(' ')
    ) {
      setEditedTransaction(transaction);
    }
    setIsEdit((pre) => !pre);
  };

  const onDeleteTransaction = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status !== 201) throw await response.json();
      dispatch(deleteTransaction(id));
    } catch (err) {
      setErr(`${err.message}`);

      setTimeout(() => {
        setErr('');
      }, 3000);
    }
  };

  const onUpdateTransaction = async (id) => {
    editedTransaction.amount = Number.isInteger(editedTransaction.amount) ? Number(editedTransaction.amount) : Number(editedTransaction.amount).toFixed(2);
    console.log('editedTransaction', editedTransaction);
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedTransaction),
        }
      );
      if (response.status !== 200) {
        throw new Error('something went wrong');
      }
      setIsEdit(false);
      dispatch(updateTransaction(editedTransaction));
    } catch (err) {
      setErr(err.message);
      setTimeout(() => {
        setErr('');
      }, 2000);
    }
  };

  const { title, amount, createdAt } = transaction;

  return (
    <div className="transaction">
      <div>{new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
      <span>{title}</span>
      <div className={amount > 0 ? 'plus' : 'minus'}>
        ${Number.isInteger(amount) ? amount : Number(amount).toFixed(2)}
      </div>
      <div>
        <button
          onClick={() => setOpenModal((pre) => !pre)}
          className="btn btn-sm"
        >
          View
        </button>
      </div>
      <Modal
        openModal={openModal}
        closeModal={closeModal}
        transaction={transaction}
        editedTransaction={editedTransaction}
        deleteTransaction={onDeleteTransaction}
        updateTransaction={onUpdateTransaction}
        onChange={onChange}
        onEditHandler={onEditHandler}
        isEdit={isEdit}
        err={err}
      />
    </div>
  );
};

export default Transaction;

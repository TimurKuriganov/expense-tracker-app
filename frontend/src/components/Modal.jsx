import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({
  openModal,
  closeModal,
  deleteTransaction,
  updateTransaction,
  editedTransaction,
  onEditHandler,
  isEdit,
  onChange,
  err,
  transaction,
}) => {
  if (!openModal) return null;

  return ReactDOM.createPortal(
    <div className="modalBackground">
      <div className="modal">
        <div className="modal-transaction">
          <h3 style={{ color: 'green', fontWeight: 700 }}>Transaction</h3>
          {err && <h1>{err}</h1>}

          <div className={`modal-item ${isEdit ? 'edit' : ''}`}>
            <h4>Title:</h4>
            {!isEdit ? (
              <span>{editedTransaction.title}</span>
            ) : (
              <input
                type="text"
                name="title"
                value={editedTransaction.title}
                onChange={onChange}
              />
            )}
          </div>

          <div className={`modal-item ${isEdit ? 'edit' : ''}`}>
            <h4>Amount:</h4>
            {!isEdit ? (
              <span>${Number.isInteger(editedTransaction.amount) ? Number(editedTransaction.amount) : Number(editedTransaction.amount).toFixed()}</span>
            ) : (
              <input
                type="number"
                name="amount"
                // value={transactionValues.amount}
                value={editedTransaction.amount}
                onChange={onChange}
              />
            )}
          </div>
          {!editedTransaction.description && !isEdit ? null : (
            <div className={`modal-item ${isEdit ? 'edit' : ''}`}>
              <h4>Description:</h4>
              {!isEdit ? (
                <span>{editedTransaction.description}</span>
              ) : (
                <textarea
                  name="description"
                  cols="30"
                  rows="4"
                  value={
                    editedTransaction.description
                      ? editedTransaction.description
                      : ''
                  }
                  placeholder={
                    !editedTransaction.description
                      ? 'No description was provided'
                      : ''
                  }
                  onChange={onChange}
                ></textarea>
              )}
            </div>
          )}

          <span className="modal-item">
            <h4>
              {new Date(editedTransaction.createdAt).toLocaleString('en-US')}
            </h4>
          </span>
        </div>

        <div className="actions">
          <button
            className="btn-sm"
            onClick={
              !isEdit
                ? (e) => deleteTransaction(editedTransaction._id, e)
                : (e) => updateTransaction(editedTransaction._id, e)
            }
            disabled={
              (isEdit && !editedTransaction.title) ||
              (isEdit && !+editedTransaction.amount)
            }
          >
            {!isEdit ? 'Delete' : 'Save'}
          </button>
          <button className="btn-sm" onClick={onEditHandler}>
            Edit
          </button>
          <button className="btn-sm" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;

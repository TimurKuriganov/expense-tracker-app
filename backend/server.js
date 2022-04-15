const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./db/config');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

connectDB()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/transactions', require('./routes/transactions'));

app.all('*', (req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    res.status(400).json({
      error: messages,
      status: 400
    });
  } else if (message === 'Transaction not found') {
    console.log('err caast error', err);
    return res.status(status).json({
      error: message,
      status
    });
  } else if (message === 'Page not found') {
    console.log('page not found delete', err.message);
    return res.status(status).json({
      error: message
    })
  } else if (err.name=== 'CastError') {
    return res.status(400).json({
      message: 'Transaction not found'
    })
  } else {
    res.status(500).json({
      error: message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server stated on port ${PORT}`);
});

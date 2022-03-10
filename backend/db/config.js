const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

function connectDB() {
  mongoose.connect(process.env.CONNECTION_URL, options)
  .then(() => console.log('MONGODB CONNECTED...'))
  .catch((err) => console.log('ERROR', err));
}

module.exports = connectDB;

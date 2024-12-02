const mongoose = require('mongoose');

const connect_to_database = async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/contact', {});

  mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected!');
  });

  mongoose.connection.on('error', (err) => {
    console.log('An error occurred in database connection!', err);
  });
};

module.exports = { connect_to_database };

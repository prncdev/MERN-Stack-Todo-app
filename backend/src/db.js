const mongoose = require('mongoose');

const connectDB = async function(DB_URL) {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(`Database connected on -> ${conn.connection.host}`);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
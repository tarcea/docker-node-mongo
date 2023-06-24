const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
} = require('../config/config');
const bookRouter = require('./routes/bookRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connect = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('connected to MongoDB');
  } catch (err) {
    console.log(err);
    // in case db don't want to connect, retry every 5 seconds...
    setTimeout(connect, 5000);
  }
};

connect();

app.get('/', (req, res) => {
  res.json({ message: 'hello gogo 333' });
});

app.use('/api/v1/books', bookRouter);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

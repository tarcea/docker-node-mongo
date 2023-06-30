const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
  REDIS_URL,
  SESSION_SECRET,
} = require('../config/config');
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');
const { createClient } = require('redis');
const session = require('express-session');
const { default: RedisStore } = require('connect-redis');

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

const redisClient = createClient({ url: REDIS_URL });
const store = new RedisStore({ client: redisClient });
redisClient.connect().catch(console.error);

app.enable('trust proxy');
app.use(cors({}));

app.use(
  session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

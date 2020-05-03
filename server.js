const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({
  path: './config/config.env',
});

// Connect to DB
connectDB();

// Route files
const auth = require('./routes/v1/auth');
const todos = require('./routes/v1/todos');

const app = express();

// Use body-parser
app.use(express.json());

// Enable cors
app.use(cors());

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/todos', todos);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});

server.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit());
});

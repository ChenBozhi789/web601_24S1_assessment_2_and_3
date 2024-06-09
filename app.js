// Import express module
const express = require('express');
// Import middleware 'body-Parser'
const bodyParser = require('body-parser');
// Import middleware 'cors'
const cors = require('cors');
// Import middleware 'mongoose'
const mongoose = require('mongoose');
const noteRouter = require('./routes/notes');
const userRouter = require('./routes/user');
const config = require('./config');
// // Import morgan
// const morgan = require('morgan');

// Create express instance
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(config.db)
  .then(() => console.log('MongoDB have connected'))
  .catch(err => console.log(err));

/* Use Middleware */
// Analysis JSON data
app.use(bodyParser.json());
// Analysis information
app.use(bodyParser.urlencoded({ extended: true }));
// Allow cross-domain requests
app.use(cors()); 
// Configure Middleware 'manage error handling'
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server have something broke!');
});

/* Routes */
// Note Router
app.use('/notes', noteRouter);
// User Router
app.use('/users', userRouter);

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
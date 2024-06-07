// Import express module
const express = require('express');
// Import middleware 'body-Parser'
const bodyParser = require('body-parser');
// Import middleware 'cors'
const cors = require('cors');
// Import middleware 'mongoose'
const mongoose = require('mongoose');
const noteRouter = require('./routes/notes');
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
app.use(bodyParser.json()); // 解析 JSON 数据
app.use(bodyParser.urlencoded({ extended: true })); // 解析URL编码数据
app.use(cors()); // 允许跨域请求
// app.use(morgan('dev')); // Configure Middleware 'morgan'

app.use('/notes', noteRouter);

// Configure Middleware 'manage error handling'
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server have something broke!');
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
// Import express module
const express = require('express');
// Import middleware 'body-Parser'
const bodyParser = require('body-parser');
// Import morgan
const morgan = require('morgan');
// Import route file
const router = require('./routes/noteRoutes');
// Import MongoDB connection
const mongoose = require('../db');

// Create express instance
const app = express();
const port = process.env.PORT || 8888;

/* Configure Middleware */
// Configure Middleware 'body-Parser'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Middleware 'morgan'
app.use(morgan('dev'));

// Configure Middleware 'manage error handling'
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server have something broke!');
});

// 解析 JSON 请求体
app.use(express.json());

// 在 server.js 中使用 app.use('/notes', Router); 
// 可以成功访问的原因是它设置了一个路由前缀 /notes，并将其与 notesRouter 关联起来，从而使得所有匹配该前缀的请求都交由 Router 处理
app.use('/notes', router);

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
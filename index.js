const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();

// DB setup
mongoose.connect('mongodb://localhost:test/test');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 6001;
const server = http.createServer(app);
server.listen(port);
console.log('Server is running: ', port);
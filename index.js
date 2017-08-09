const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//requiring routes
const commentRoutes = require("./routes/comments");
const postRoutes = require("./routes/posts");
const indexRoutes = require("./routes/index");


const app = express();

// DB setup
mongoose.connect('mongodb://localhost/test');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));

// routers
app.use("/", indexRoutes);
app.use("/posts", postRoutes);
app.use("/posts", commentRoutes);

// Server Setup
const port = process.env.PORT || 6001;
const server = http.createServer(app);
server.listen(port);
console.log('Server is running: ', port);
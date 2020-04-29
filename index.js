const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const compression = require('compression')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
const io = require('socket.io').listen(app.listen(port));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-xn2pr.mongodb.net:27017,cluster0-shard-00-01-xn2pr.mongodb.net:27017,cluster0-shard-00-02-xn2pr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

app
  .use(express.static(path.join(__dirname, '/public')))
  .use(compression())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.json())

io.sockets.on('connection', function (socket) {
  console.log('client connect');
  socket.on('echo', function (data) {
    io.sockets.emit('message', data);
  });
});

require('./routes/api')(app, io)
console.log(`Server listening to ${port}`)






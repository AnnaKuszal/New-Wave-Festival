const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

//const uuidv4 = require('uuid/v4');
//const db = require('./db');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const helmet = require('helmet');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

// connects our backend code with the database
mongoose.connect('mongodb+srv://Anna_Kuszal:Access2020%23@cluster0-okq4w.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');

  socket.on('seatsUpdated', () => {
    console.log('I got something');
  });

});

module.exports = server;
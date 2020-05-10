const express = require('express');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const db = require('./../db');


router.route('/seats').get((req, res) => {
  res.json(db.seats);
});


router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();

  const newSeat = {
    id: id, 
    day: day,
    seat: seat,
    client: client,
    email: email
  }

  if (db.seats.some(i => i.seat == newSeat.seat && i.day == newSeat.day)) {
    res.json({ message: "The slot is already taken..." });
    res.status(403).json({ message: 'The slot is already taken...' });

  } else {
    db.seats.push(newSeat);
    req.io.emit('seatsUpdated', db.seats);
    res.json({ message: 'OK' });
  }

  
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;

  const changedConcert = {
    id: id, 
    day: day,
    seat: seat,
    client: client,
    email: email
  }

  const item = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(item);

  db.seats[index] = changedConcert;

  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const item = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(item);
  db.seats.splice(index, 1);

  res.json({ message: 'OK' });
});


module.exports = router;
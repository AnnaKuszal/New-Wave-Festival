const express = require('express');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const db = require('./../db');


router.route('/seats').get((req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


router.route('/seats/:id').get((req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.route('/seats').post((req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    await Seat.findByIdAndUpdate(
      req.params.id,
      { $set: { day: day, seat: seat, client: client, email: email } },
      { new: true },
      (err, doc) => {
        if (err) res.status(404).json({ message: 'Not found...' });
        else res.json(doc);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.route('/seats/:id').delete((req, res) => {
  try {
    await Seat.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) res.status(404).json({ message: 'Not found...' });
      else res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


module.exports = router;
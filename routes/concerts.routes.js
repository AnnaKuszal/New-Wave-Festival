const express = require('express');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const db = require('./../db');


router.route('/concerts').get((req, res) => {
  try {
    res.json(await Concert.find());
  } catch {
    res.status(500).json({ message: err });
  }
});

router.route('/concerts/:id').get((req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.route('/concerts').post((req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    await Concert.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          performer: performer,
          genre: genre,
          price: price,
          day: day,
          image: image
        }
      },
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

router.route('/concerts/:id').delete((req, res) => {
  try {
    await Concert.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) res.status(404).json({ message: 'Not found...' });
      else res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


module.exports = router;
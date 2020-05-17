const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.getOne = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const clean = sanitize(req.body);
  const { day, seat, client, email } = clean;
  const io = req.io;

  try {
    Seat.where('day').equals(day).where('seat').equals(seat).exec(async function (err, seats) {
      if(seats.length > 0) {
        res.status(403).json({ message: 'The slot is already taken...' });
      } else {
        const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
        await newSeat.save();
        const seats = await Seat.find();
        res.json(seats);
        io.emit('seatsUpdated', seats);   
      }
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const st = await(Seat.findById(req.params.id));
    if(st) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const st = await(Seat.findById(req.params.id));
    if(st) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

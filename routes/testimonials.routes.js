const express = require('express');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const db = require('./../db');


router.route('/testimonials').get((req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length + 0)]);

  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testim = await Testimonial.findOne().skip(rand);
    if(!testim) res.status(404).json({ message: 'Not found' });
    else res.json(testim);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}); 


router.route('/testimonials/:id').get((req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.route('/testimonials').post((req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  try {
    await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: { author: author, text: text } },
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

router.route('/testimonials/:id').delete((req, res) => {
  try {
    await Testimonial.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) res.status(404).json({ message: 'Not found...' });
      else res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
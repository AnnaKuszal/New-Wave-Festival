const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getOne);
router.post('/seats', SeatController.post);
router.put('/seats/:id', SeatController.put);
router.delete('/seats/:id', SeatController.delete);

module.exports = router;
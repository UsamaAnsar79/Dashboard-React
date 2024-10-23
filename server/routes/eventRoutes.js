const express = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

// GET all events
router.get('/', getEvents);

// POST a new event
router.post('/', createEvent);

// PUT update an event
router.put('/:id', updateEvent);

// DELETE an event
router.delete('/:id', deleteEvent);

module.exports = router;

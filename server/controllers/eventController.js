
const Event = require('../models/Event');

// Fetch all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('users', 'name'); // Populate user names if needed
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error: error.message });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  console.log('Incoming event data:', req.body);

  const { title, description, time, start, end, users } = req.body; // Include users here

  // Validate incoming data
  if (!title || !time || !start || !end || !users) {
    return res.status(400).json({ message: 'Title, time, date, and users are required.' });
  }

  // Validate time format (optional)
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
  if (!timeRegex.test(time)) {
    return res.status(400).json({ message: 'Invalid time format. Use HH:MM.' });
  }

  // Parse and validate the date
  let parsedStart, parsedEnd;
  try {
    parsedStart = new Date(start);
    parsedEnd = new Date(end);

    if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
      throw new Error('Invalid date format.');
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid date format. Please use a valid date string.' });
  }

  const newEvent = new Event({
    title,
    description: description || '',
    time,
    start: parsedStart,
    end: parsedEnd,
    users, // Add users here
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ message: 'Failed to create the event', error: error.message });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, time, start, end, users } = req.body; // Include users here

  // Validate incoming data
  if (!title || !time || !start || !end || !users) {
    return res.status(400).json({ message: 'Title, time, date, and users are required.' });
  }

  let parsedStart, parsedEnd;
  try {
    parsedStart = new Date(start);
    parsedEnd = new Date(end);

    if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
      throw new Error('Invalid date format.');
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid date format. Please use a valid date string.' });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, time, start: parsedStart, end: parsedEnd, users }, // Add users here
      { new: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error: error.message });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

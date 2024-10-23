const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  start: {
    type: Date, 
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  time:{
    type:String,
    required:true,
  },
  users: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User'
     }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

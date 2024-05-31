// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  time: String,
  description: String,
  date: Date
});

const Event = mongoose.model('Event', eventSchema);

export default Event;

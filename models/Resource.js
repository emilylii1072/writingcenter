// models/Resource.js
import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String },
  link: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['opportunities', 'writing-help', 'important-documents', 'additional-resources'], required: true }
});

export default mongoose.model('Resource', resourceSchema);

import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    grade: { type: String, required: true },
    assignment: { type: String, required: true },
    noiseLevel: { type: Number, required: true },
    helpfulness: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true } // Duration in minutes
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;

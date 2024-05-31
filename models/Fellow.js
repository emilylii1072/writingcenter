import mongoose from 'mongoose';

const FellowSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    day: { type: String, required: true },
    image: { type: String, required: true }
});

const Fellow = mongoose.model('Fellow', FellowSchema);

export default Fellow;

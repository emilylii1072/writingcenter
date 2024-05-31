import mongoose from 'mongoose';

const opportunitiesSchema = new mongoose.Schema({
    title: String,
    description: String,
    deadline: Date,
    link: String,
    type: String
});

const Opportunities = mongoose.model('Opportunities', opportunitiesSchema);

export default Opportunities;

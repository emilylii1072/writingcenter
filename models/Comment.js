import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  group: { type: String, enum: ['grammar', 'thesis', 'analysis', 'creative'], required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['guest', 'fellow', 'admin'], required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  parentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;

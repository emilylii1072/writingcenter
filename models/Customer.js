import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';

const CustomerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

//  purchases: {
//    items: [{
//      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//      quantity: { type: Number, required: true, min: 1 },
//      price: { type: Number, required: true },
//    }],
//    totalQuantity: { type: Number, default: 0 },
//    totalPrice: { type: Number, default: 0 },
//  },
  status:{
    type: String,
      enum: ['fellow', 'admin', 'guest'],
      default: 'guest'
  },
//  reviews:[
//  {
//    customer: {type: String},
//    product: {type: String},
//    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
//    comment: { type: String},
//    createdAt: { type: Date, default: Date.now }
//  }],
//  cart: {
//    items: [{
//      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//      quantity: { type: Number, required: true, min: 1 },
//      price: { type: Number, required: true },
//    }],
//    totalQuantity: { type: Number, default: 0 },
//    totalPrice: { type: Number, default: 0 },
//  },
});

CustomerSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

CustomerSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Check if the model exists before compiling it
const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);

export default Customer;
// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
//   totalAmount: { type: Number, required: true },
//   customerName: { type: String, required: true },
//   address: { type: String, required: true },
//   status: { type: String, default: 'Pending' },
//   createdAt: { type: Date, default: Date.now },
//   quantity:{type: mongoose.Schema.Types.ObjectId}
// });

// module.exports = mongoose.model('Order', OrderSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  products: [
    {
      product: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);

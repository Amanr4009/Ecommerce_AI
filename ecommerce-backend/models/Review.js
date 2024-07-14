const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    product: { type: Number, ref: 'Product', required: true },
    feedback: { type: String, required: true },
    classification: { type: String},
});

module.exports = mongoose.model('Review', reviewSchema);

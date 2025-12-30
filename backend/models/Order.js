const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    message: {
        type: String,
    },
    payment_method: {
        type: String,
        required: true,
        enum: ['cash_on_delivery', 'upi'],
    },
    items: [{
        name: { type: String, required: true },
        code: { type: String, required: true },
        category: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String },
    }],
    total_items: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

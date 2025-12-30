const Order = require('../models/Order');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
    try {
        const { name, email, phone, address, items, total_items, total_price, payment_method, message } = req.body;

        // 1. Check if user exists or create new one
        let user = null;
        if (email) {
            user = await User.findOne({ email });
        }

        if (!user) {
            user = await User.create({
                name,
                email: email || `no-email-${Date.now()}@example.com`, // Fallback for no email
                phone,
                address,
            });
        } else {
            // Update user details if needed (optional, keeping it simple for now)
            user.phone = phone;
            user.address = address;
            await user.save();
        }

        // 2. Create Order with User ID
        const order = await Order.create({
            user: user._id,
            name,
            email,
            phone,
            address,
            items,
            total_items,
            total_price,
            payment_method,
            message,
        });

        // 3. Add Order to User's history
        user.orders.push(order._id);
        await user.save();

        // Send confirmation email
        try {
            if (email) {
                const itemList = items.map(i => `${i.name} (x${i.quantity}) - ₹${i.price}`).join('<br>');

                await sendEmail({
                    email: email,
                    subject: 'Order Confirmation - Megastar Doors & Windows',
                    message: `Hi ${name},\n\nThank you for your order!\nTotal: ₹${total_price}\n\nWe will process it soon.`,
                    html: `<h1>Order Confirmed</h1><p>Hi ${name},</p><p>Thank you for your order.</p><h3>Items:</h3><p>${itemList}</p><h3>Total: ₹${total_price}</h3><p>We will contact you for delivery.</p>`
                });
            }
        } catch (err) {
            console.error('Email send failure:', err.message);
        }

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public (Should be protected for Admin in real app)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders
};

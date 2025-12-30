const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Order = require('./models/Order');

dotenv.config();

const checkOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB...');

        const orders = await Order.find({}).sort({ createdAt: -1 });

        console.log(`\nFound ${orders.length} orders:\n`);

        orders.forEach(order => {
            console.log(`Order ID: ${order._id}`);
            console.log(`Customer: ${order.name} (${order.email})`);
            console.log(`Amount: ₹${order.total_price}`);
            console.log(`Date: ${order.createdAt}`);
            console.log('---');
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkOrders();

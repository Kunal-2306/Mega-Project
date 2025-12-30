const Inquiry = require('../models/Inquiry');
const sendEmail = require('../utils/sendEmail');

// @desc    Create a new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const inquiry = await Inquiry.create({
            name,
            email,
            phone,
            message,
        });

        // Send confirmation email to user
        try {
            await sendEmail({
                email: email,
                subject: 'Inquiry Received - Megastar Doors & Windows',
                message: `Hi ${name},\n\nWe have received your inquiry: "${message}".\n\nWe will get back to you shortly.\n\nRegards,\nMegastar Doors Team`,
                html: `<h1>Hi ${name},</h1><p>We have received your inquiry:</p><blockquote>${message}</blockquote><p>We will get back to you shortly.</p><p>Regards,<br>Megastar Doors Team</p>`
            });
        } catch (err) {
            console.error('Email send failure:', err.message);
            // Do not fail the request if email fails
        }

        res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Public (Should be protected for Admin in real app)
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createInquiry,
    getInquiries
};

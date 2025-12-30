const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Check if SMTP credentials are provided, otherwise log mimic
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        console.log('--- EMAIL SIMULATION ---');
        console.log(`To: ${options.email}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Message: \n${options.message}`);
        console.log('------------------------');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: options.html, // Use HTML for rich emails
        text: options.message, // Fallback
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;

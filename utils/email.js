const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // Make a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'Jonas Schmedtmann <hello@jonas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message
            // html:
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
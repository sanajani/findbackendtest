import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const APP_PASSWORD = process.env.APP_PASSWORD;
const USER_EMAIL = process.env.USER_EMAIL;
// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER_EMAIL, // Replace with your Gmail address
        pass: APP_PASSWORD // Replace with your Gmail password
    }
});

export const contactForm = (req, res) => {
    console.log(req.body);
    const { name, email, comment } = req.body;

    // Email configuration
    const mailOptions = {
        from: email,
        to: USER_EMAIL, // Replace with your receiving email address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${comment}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent: ');
            res.status(200).json({ message: 'Email sent successfully', success: true });
        }
    });
}
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to,
            subject,
            text,
        })
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        throw new Error('Failed to send email');
    }
}


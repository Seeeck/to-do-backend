const nodemailer = require("nodemailer");
require('dotenv').config();

async function sendMail(email: { to: string, subject: string, text: string, html: string }) {

    try {

        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST ?? '',
            port: process.env.MAILER_PORT ?? 0,
            auth: {
                user: process.env.MAILER_USER ?? '',
                pass: process.env.MAILER_USER_PASSWORD ?? '',
            }
        });
        let info = await transporter.sendMail({
            from: process.env.MAILER_USER ?? '', // sender address
            to: email.to, // list of receivers
            subject: email.subject, // Subject line
            text: email.text, // plain text body
            html: email.html, // html body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error: any) {
        throw new Error("Failed to send email with nodemailer.")
    }
}


export { sendMail }
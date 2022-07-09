import { createTransport } from "nodemailer"

export let sendMail = async (email, subject, text) => {
    let transport = createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.STMP_USER,
            pass: process.env.SMTP_PASS,
        }
    })
    await transport.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject,
        text,
    })
}
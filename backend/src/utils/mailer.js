import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

// initialise dotenv
dotenv.config()

export const mailTransport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
    }
})

export const sendMail = async mailOptions => {
    console.log(mailOptions)
    try {
        const { messageId } = await mailTransport.sendMail({
            from: process.env.EMAIL_USERNAME,
            ...mailOptions,
        })
        console.info(`Mail sent: ${messageId}`)
    } catch (error) {
        console.error(error)
    }
}

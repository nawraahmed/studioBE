const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_USER, // Email sender
    to, // Recipient's email
    subject, // Subject of the email
    text, // Plain text content
    html // HTML content
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

module.exports = sendEmail

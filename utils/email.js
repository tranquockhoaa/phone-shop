const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (!options.email) {
    throw new Error('Recipient email is missing!');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"Khoa" <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject || 'No Subject',
    text: options.message || 'No Message Provided',
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

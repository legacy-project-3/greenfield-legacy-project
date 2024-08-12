require('dotenv').config();
const nodemailer = require("nodemailer");

const sendMail = (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Thank you for contacting us",
    html: `
      <body style="font-family: 'Poppins', Arial, sans-serif">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 20px;">
              <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #cccccc;">
                <!-- Header -->
                <tr>
                  <td class="header" style="background-color: #DB4444; padding: 40px; text-align: center; color: white; font-size: 24px;">
                    e-commerce shop
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                    Hello ${name} <br>
                   We have received your message regarding your ${subject} and we will make sure to contact you as soon as possible,
                    <br><br>
                    thank you for your understanding
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td class="footer" style="background-color: #000000; padding: 40px; text-align: center; color: white; font-size: 14px;">
                    Copyright © 2024 | e-commerce
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Failed to send email', error });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Email sent successfully', info });
    }
  });
};

module.exports = { sendMail };

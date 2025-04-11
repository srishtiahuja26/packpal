const sgMail = require("@sendgrid/mail");
const client = require("@sendgrid/client");

sgMail.setApiKey(process.env.SG_API_KEY);
client.setApiKey(process.env.SG_API_KEY);

/**
 * Sends a transactional or bulk email using SendGrid dynamic templates.
 *
 * @param {string|string[]} to - Recipient email or array of emails (for bulk).
 * @param {string} templateId - SendGrid dynamic template ID.
 * @param {object} dynamic_template_data - Data to fill in the template.
 * @param {boolean} [bulk=false] - Set to true to send to multiple recipients.
 */
const sendEmail = async (to, templateId, dynamic_template_data, bulk = false) => {
  const msg = {
    to,
    from: {
      name: process.env.SG_SENDER_NAME,
      email: process.env.SG_SENDER_EMAIL,
    },
    templateId,
    dynamic_template_data,
  };

  try {
    if (bulk) {
      await sgMail.sendMultiple(msg);
    } else {
      await sgMail.send(msg);
    }
  } catch (err) {
    console.error("SendGrid Error:", err?.response?.body || err);
  }
};

module.exports = { sendEmail };

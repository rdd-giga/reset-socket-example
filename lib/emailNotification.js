const config = require('../config.json');
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(config.sendgrid.sendgrid_api_key);
/**
 * Send  email by sendgrid.
 * @param   {String} from       email address for sender
 * @param   {String} to         email address you want send to
 * @param   {String} subject    email subject
 * @param   {String} body       email body
 */
function sendEmail(from, to, subject, body) {
  sendgrid
    .send({ from, to, subject, text: body })
    .then(() => {
      console.log(`Notification Email sent from ${from} to ${to} for ${subject}`);
    })
    .catch((error) => {
      console.error(error);
    });
}
module.exports = {
  sendEmail: sendEmail
}

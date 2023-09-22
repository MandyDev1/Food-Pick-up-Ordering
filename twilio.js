require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const sendSMS = (receiver, message) => {
   // SEND MESSAGE TO RESTAURANT
   client.messages
   .create({
     body: message,
     from: process.env.TWILIO_PHONE_NUMBER,
     to: receiver
   })
   .then(message => console.log(message.sid));
}


module.exports = { sendSMS };

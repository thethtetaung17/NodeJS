const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

//Step 1
let transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user:process.env.GMAIL,
    pass:process.env.PASSWORD
}
})

// Step 2
let mailOptions = {
    from: 'test.tha.mm@gmail.com',
    to: 'thethtetaung17@gmail.com',
    subject: 'Test sending email',
    text: 'Sending email works.'
}

// Step 3
transporter.sendMail(mailOptions, function(err, data) {
    if(err) {
        console.log("Error: " +err)
    } else {
        console.log("Email sent! :3")
    }
})
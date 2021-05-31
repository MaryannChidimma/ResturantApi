
const nodemailer = require("nodemailer");
const { resetPasswordMail, adminLoginMail } = require('../../lib/emailFormatter')



const emailbody = (type, options) => {
    const { name, token, password } = options
    if ("resetPassword" === type) {
        return resetPasswordMail({ name, token })
    }
    else if ("adminLoginPassword") {
        return adminLoginMail({ name, password, link: "https://www.google.com/" })
    }
}
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

        user: process.env.user,
        pass: process.env.pass
    }
});

exports.mailComposer = async (email, subject, type, options) => {
    mailOptions = {
        from: "maryann.okonkwo.g20@gmail.com",
        to: email,
        subject: subject,
        html: emailbody(type, options)
    };
    const mail = await transporter.sendMail(mailOptions);
    if (!mail) {
        throw new Error("Something went wrong")
    }
    return mail.response;
}
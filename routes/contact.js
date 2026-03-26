const router = require("express").Router();
const User = require("../models/User");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

// const nodeMailer = require("nodemailer");
// const transporter = nodeMailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.WESHARE_EMAIL,
//         pass: process.env.WESHARE_PASS_CODE
//     }
// });

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_SENDER_API_KEY
});

router.post("/contactOwner", async (req,res) => {
    try{
        const user = await User.findById(req.body._id);

        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `"Arbi's Portfolio Support" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            to: [user.username],
            subject: "New Job Offer Request 💼",

            text: `
                You have received a new job offer request from your portfolio website.

                Details:

                Name: ${req.body.name}
                Mobile: ${req.body.mobileNumber}
                Email: ${req.body.emailContact}
                Subject: ${req.body.subject}

                Message:
                ${req.body.message}
            `,

            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

                <h2 style="color: #007bff;">💼 New Job Offer Request</h2>

                <p>Hello ${user.firstName || "there"},</p>

                <p>You have received a new job offer request through your <strong>portfolio website</strong>.</p>

                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Name:</strong> ${req.body.name}</p>
                  <p><strong>Mobile:</strong> ${req.body.mobileNumber}</p>
                  <p><strong>Email:</strong> ${req.body.emailContact}</p>
                  <p><strong>Subject:</strong> ${req.body.subject}</p>
                </div>

                <p><strong>Message:</strong></p>
                <div style="background: #fafafa; padding: 15px; border-left: 4px solid #007bff; border-radius: 5px;">
                  ${req.body.message}
                </div>

                <br/>

                <p style="color: #555;">We recommend replying directly to the sender's email to continue the conversation.</p>

                <hr style="margin: 30px 0;" />

                <p style="font-size: 12px; color: #999;">
                  — Arbi's Portfolio System
                </p>
      
              </div>
            `
        });

        // const mailOptions = {
        //     from: process.env.WESHARE_EMAIL,
        //     to: user.username,
        //     subject: 'Job Offer Email\n',
        //     text: `You are receiving this email because someone has contacted you for a job offer in your personal website.\n\nTheir information is:\n\nName: ${req.body.name}\nMobile: ${req.body.mobileNumber}\nEmail: ${req.body.emailContact}\nSubject: ${req.body.subject}\nMessage: \n${req.body.message}`
        // };

        // transporter.sendMail(mailOptions, (err, response) => {
        //     if (err){
        //         console.log(err);
        //         res.status(500).json('Error sending email!');
        //     }
        //     else{
        //         user.save();
        //         res.status(200).json("Thanks for contacting me. You will hear from me soon!");
        //     }
        // })
        return res.status(200).json("Thanks for contacting me. You will hear from me soon!"); 
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
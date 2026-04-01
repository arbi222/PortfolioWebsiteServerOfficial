const router = require("express").Router();
const User = require("../models/User");
const {mg} = require("../helper");

router.post("/contactOwner", async (req,res) => {
    try{
        const user = await User.findById(req.body._id);

        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `"Arbi's Portfolio Support" <noreply@${process.env.MAILGUN_DOMAIN}>`,
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
                  ${req.body.mobileNumber && <p><strong>Mobile:</strong> ${req.body.mobileNumber}</p>}
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

        return res.status(200).json("Thanks for contacting me. You will hear from me soon!"); 
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
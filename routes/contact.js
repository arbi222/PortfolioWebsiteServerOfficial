const router = require("express").Router();
const User = require("../models/User");
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.WESHARE_EMAIL,
        pass: process.env.WESHARE_PASS_CODE
    }
});

router.post("/contactOwner", async (req,res) => {
    try{
        const user = await User.findById(req.body._id);

        const mailOptions = {
            from: process.env.WESHARE_EMAIL,
            to: user.username,
            subject: 'Job Offer Email\n',
            text: `You are receiving this email because someone has contacted you for a job offer in your personal website.\n\nTheir information is:\n\nName: ${req.body.name}\nMobile: ${req.body.mobileNumber}\nEmail: ${req.body.emailContact}\nSubject: ${req.body.subject}\nMessage: \n${req.body.message}`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err){
                console.log(err);
                res.status(500).json('Error sending email!');
            }
            else{
                user.save();
                res.status(200).json("Thanks for contacting me. You will hear from me soon!");
            }
        })
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
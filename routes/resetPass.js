const router = require("express").Router();
const User = require("../models/User");
const crypto = require('crypto');
const {mg} = require("../helper");


router.post("/forgotPassword", async (req,res) => {
    const email = req.body.email;

    try{
        const user = await User.findOne({username: email});
        if (!user) {
            return res.status(400).json("User with this email does not exist!")
        }
    
        const token = crypto.randomBytes(25).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 600000 // 10 min
        await user.save();

        const resetLink = `${process.env.FRONTEND_LINK}/reset-password/${token}`

        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `"Arbi's Portfolio Support" <noreply@${process.env.MAILGUN_DOMAIN}>`,
            to: [user.username],
            subject: "Password Reset Request",

            text: `
                You requested a password reset.

                Click the link below to reset your password (valid for 10 minutes):
                ${resetLink}

                If you did not request this, please ignore this email.
            `,

            html: `
                <div style="font-family: Arial; line-height: 1.6;">
                  <h2>Password Reset</h2>

                  <p>Hello ${user.firstName || "there"},</p>

                  <p>You requested to reset your password.</p>

                  <p>
                    Click the button below to reset it (valid for 10 minutes):
                  </p>

                  <a href="${resetLink}" 
                     style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">
                     Reset Password
                  </a>

                  <p>If you didn’t request this, ignore this email.</p>

                  <hr/>
                  <p style="font-size:12px;color:#999;">Arbi's Portfolio System</p>
                </div>
            `
        });

        return res.status(200).json({ message: "Reset email sent successfully!" });
    }
    catch(err){
        return res.status(500).json("Server error");
    }
})

router.post("/resetPassword/:token", async (req,res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {$gt: Date.now()}
    })

    if (!user) {
        return res.status(400).json("Password reset token is invalid or has expired!")
    }
                                       
    if (req.body.newPassword === req.body.confirmPassword){
        user.setPassword(req.body.newPassword, (err, userUpdate) => {
            if (err){
                return res.status(500).json("Error setting new password!")
            }
            else{
                user.hash = userUpdate.hash;
                user.salt = userUpdate.salt;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save();
            }
        })
        return res.status(200).json("Password changed!")
    }
    else{
        return res.status(400).json("Passwords do not match!")
    }
})

module.exports = router;

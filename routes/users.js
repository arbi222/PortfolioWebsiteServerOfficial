const router = require("express").Router();
const User = require("../models/User")

// Get user
router.get("/getUser", async (req, res) => {
    try{
        const user = await User.find();
        if (user){
            res.status(200).json(user);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Get user
router.get("/getUser/:accessToken", async (req, res) => {
    try{
        const user = await User.findById(req.params.accessToken);
        if (user){
            res.status(200).json(user);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Adding skills to user
router.put("/addSkill", async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.body.userId, {$set: {skills: req.body.skills}});
        res.status(200).json("Skills updated.");
    }   
    catch(err){
        res.status(500).json(err);
    }
});

// Update user
router.put("/:id", async (req,res)=> {
    if (req.body.userId === req.params.id){
        if (req.body.newPassword){
            if (req.body.newPassword === req.body.confirmPassword){
                try{
                    const user = await User.findById(req.params.id); 
    
                    await user.changePassword(req.body.oldPass, req.body.newPassword, function(err){
                        if(err){
                            return res.status(400).json("Old password is wrong!");
                        }
                        else{
                            return res.status(200).json("Password changed successfully!");
                        }
                    })
                }
                catch(err){
                    return res.status(500).json(err);
                }
            }
            else{
                return res.status(403).json("Password & Confirm Password do not match!")
            }
        }
        else{
            try{
                await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
                res.status(200).json("Account has been updated!");
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
    }
    else{
        return res.status(403).json("You can't update this account!")
    }
})

module.exports = router
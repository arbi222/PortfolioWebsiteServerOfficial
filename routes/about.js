const router = require("express").Router();
const About = require("../models/About");

// Get about
router.get("/getAbout/:userId", async (req, res) => {
    try{
        const about = await About.findOne({userId: req.params.userId});
        if (about){
            res.status(200).json(about);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Create or Update about
router.post("/createOrUpdateAbout", async (req, res) => {
    try{
        const about = await About.findOne({userId: req.body.about.userId});
        if (about){
            await about.updateOne({$set: req.body.about});
            res.status(200).json("updated");
        }
        else{
            const newAbout = new About(req.body.about);
            await newAbout.save();
            res.status(200).json("created");
        } 
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
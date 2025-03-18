const router = require("express").Router();
const Experience = require("../models/Experience");
const User = require("../models/User");

// Get Experience
router.get("/getAllExperiences", async (req, res) => {
    try{
        const experiences = await Experience.find();
        res.status(200).json(experiences)
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Create or Update Experience
router.post("/addOrUpdateExperience", async (req, res) => {
    try{
        const experience = await Experience.findById(req.body._id);
        if (experience){
            await experience.updateOne({$set: req.body});
            res.status(200).json("Job updated successfully!");
        }
        else{
            const newExperience = new Experience(req.body);
            await newExperience.save();
            res.status(200).json("Job added successfully!");
        }
        
    }
    catch(err){
        res.status(500).json(err);
    } 
});

// Delete Experience
router.delete("/deleteExperience/:id", async (req, res) => {
    try{
        const experience = await Experience.findById(req.params.id);
        await experience.deleteOne();
        res.status(200).json("Job has been deleted!");
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
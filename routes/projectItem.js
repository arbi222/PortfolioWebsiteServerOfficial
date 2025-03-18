const router = require("express").Router();
const ProjectItem = require("../models/ProjectItem");
const Category = require("../models/Category");

// Get All Items of a Category
router.get("/getAllItems/:categoryId", async (req, res) => {
    try{
        const projectItems = await ProjectItem.find({categoryId: req.params.categoryId});
        res.status(200).json(projectItems);
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Create ProjectItem
router.post("/createorUpdateProject", async (req, res) => {
    try{
        const categoryId = req.body.categoryId;
        const categoryName = req.body.categoryName;
        const projectId = req.body.projectId;
        if (categoryId){
            const projectItem = await ProjectItem.findById(projectId);
            if (projectItem) {
                await projectItem.updateOne({$set: req.body});
                res.status(200).json("Project updated successfully!");
            }
            else{
                const projectItem = new ProjectItem(req.body);
                await projectItem.save();
                res.status(200).json("Project added successfully!");
            }
        }
        else{
            const category = await Category.findOne({categoryName});
            req.body.categoryId = category.id;
            const projectItem = new ProjectItem(req.body);
            await projectItem.save();
            res.status(200).json("Project added successfully!");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Delete ProjectItem
router.delete("/deleteProjectItem/:id", async (req, res) => {
    try{
        const projectItem = await ProjectItem.findById(req.params.id);
        await projectItem.deleteOne();
        res.status(200).json("Project has been deleted!");
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
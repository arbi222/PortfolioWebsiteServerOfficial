const router = require("express").Router();
const Category = require("../models/Category");
const ProjectItem = require("../models/ProjectItem");
const checkSessionExpiry = require("../middlewares/sessionExpiry");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Create Category
router.post("/createCategory", checkSessionExpiry, isAuthenticated, async (req, res) => {
    try{
        const existingCategory = await Category.find({categoryName: req.body.categoryName});
        if (existingCategory.length > 0){
            res.status(403).json("There is already a category with this name.");
        }
        else{
            const newCategory = new Category(req.body);
            await newCategory.save();
            res.status(200).json("New category created!");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});

// Get Categorys
router.get("/getCategorys", async (req, res) => {
    try{
        const categorys = await Category.find();
        res.status(200).json(categorys);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Delete Category
router.delete("/deleteCategory/:categoryName", checkSessionExpiry, isAuthenticated, async (req, res) => {
    try{
        const category = await Category.findOne({categoryName: req.params.categoryName});
        await ProjectItem.deleteMany({categoryId: category.id});
        await Category.deleteOne({categoryName: req.params.categoryName});
        res.status(200).json("Category deleted successfully.");
    }
    catch(err){
        res.status(500).json(err);
    }
}); 

module.exports = router;
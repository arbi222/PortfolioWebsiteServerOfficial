const mongoose = require("mongoose")

const CategorysSchema = new mongoose.Schema({
    categoryName:{
        type: String,
        default: "",
        unique: true
    },
},
    {timestamps: true}
);

module.exports = mongoose.model("Category", CategorysSchema);
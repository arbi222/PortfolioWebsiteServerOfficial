const mongoose = require("mongoose")

const ProjectItemSchema = new mongoose.Schema({
    categoryId:{
        type: String,
        required: true,
    },
    projectName:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: "",
    },
    video:{
        type: String,
        default: "",
    },
    bio:{
        type: String,
        default: "",
    },
    internetLink:{
        type: String,
        default: "",
    },
    sourceCodeLink:{
        type: String,
        default: "",
    },
},
    {timestamps: true}
);

module.exports = mongoose.model("ProjectItem", ProjectItemSchema);
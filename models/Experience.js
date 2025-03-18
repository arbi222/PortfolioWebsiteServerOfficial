const mongoose = require("mongoose")

const ExperienceSchema = new mongoose.Schema({
    workingPeriod:{
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    companyName:{
        type: String,
        required: true,
    }, 
    jobTitle:{
        type: String,
        default: ""
    },
    jobType:{
        type: String,
        default: "Full-time"
    },
    workingPlace:{
        type: String,
        default: ""
    },
    description:{
        type: String,
        default: ""
    },
    webpageLink:{
        type: String,
        default: ""
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Experience", ExperienceSchema);
const mongoose = require("mongoose")

const MeetMeSchema = new mongoose.Schema({
    title:{
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: ""
    }, 
    githubLink:{
        type: String,
        default: ""
    }, 
    linkedInLink:{
        type: String,
        default: ""
    }, 
    instagramLink:{
        type: String,
        default: ""
    }, 
    // otherLink:{
    //     type: String,
    //     default: ""
    // }, 
},
{timestamps: true}
);

module.exports = mongoose.model("MeetMe", MeetMeSchema);
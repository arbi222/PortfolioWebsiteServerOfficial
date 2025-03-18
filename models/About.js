const mongoose = require("mongoose")

const AboutSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ""
    },
    title:{
        type: String,
        default: "",
    }, 
    paragraphOne:{
        type: String,
        default: ""
    },
    paragraphTwo:{
        type: String,
        default: ""
    },
    paragraphThree:{
        type: String,
        default: ""
    },
},
{timestamps: true}
);

module.exports = mongoose.model("About", AboutSchema);
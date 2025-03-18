const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    username:{ // this is the email
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    mobileNumber:{
        type: String,
        default: ""
    },
    avatar:{
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: ""
    },
    cv:{
        type: String,
        default: ""
    },
    bio_contact:{
        type: String,
        default: ""
    },
    title_contact:{
        type: String,
        default: ""
    },
    githubLink_contact:{
        type: String,
        default: ""
    },
    linkedInLink_contact:{
        type: String,
        default: ""
    },
    instagramLink_contact:{
        type: String,
        default: ""
    },
    skills:{
        type: Array,
        default: []
    },
},
    {timestamps: true}
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema)
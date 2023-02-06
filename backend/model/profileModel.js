const mongoose = require("mongoose");

const profileModel = mongoose.Schema({
    profilePhoto: String,
    fullname: {
        type: String,
        required: [true, "name is required"]
    },
    bio: String,
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    newsletter: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Profile", profileModel);
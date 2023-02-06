const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Profile"
    // },
    title: {
        type: String,
        required: [true, "Please add a title to your blog"]
    },
    content: {
        type: String,
        required: [true, "Can\'t publish empty blog"]
    },
    likes: Number,
    comments: Array,
    tags: Array
})

module.exports = mongoose.model("Blog", blogSchema);
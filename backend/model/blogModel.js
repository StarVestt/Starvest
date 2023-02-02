const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title to your blog"]
    },
    content: {
        type: String,
        required: [true, "Can\'t publish empty blog"]
    },
    likes: Number,
    comments: Array
})

module.exports = mongoose.model("Blog", blogSchema);
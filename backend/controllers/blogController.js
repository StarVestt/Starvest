const asyncHandler = require("express-async-handler");
const Blog = require("../model/blogModel")

//@desc     get all blogs
//@route    GET /api/blogs
//@access   public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find()
    res.status(200).json(blogs)
})

//@desc     post a blog
//@route    POST /api/blogs
//@access   private
const postBlog = asyncHandler(async (req, res) => {
    if(!req.body.title || !req.body.content) {
        res.status(400)
        throw new Error("Blog details missing")
    }

    const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes ? req.body.likes : 0,
        comments: req.body.comments ? req.body.comments : []
    })

    res.status(201).json(blog)
})

//@desc     update a blog
//@route    PUT /api/blogs/:id
//@access   private
const putBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if(!blog) {
        res.status(400)
        throw new Error("Blog not found")
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedBlog)
})

//@desc     delete a blog
//@route    PUT /api/blogs/:id
//@access   private
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if(!blog) {
        res.status(404)
        throw new Error("Blog not found")
    }
 
    blog.remove();
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getBlogs,
    postBlog,
    putBlog,
    deleteBlog
}


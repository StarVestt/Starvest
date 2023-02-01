const blogs = [
    {
        name: "testing blog API",
        content: "sends the blog to the server"
    },
    {
        name: "test1",
        content: "delete the blog to the server"
    },
    {
        name: "test2",
        content: "change the blog content to the server"
    }
]

//@desc     get all blogs
//@route    GET /api/blogs
//@access   public
const getBlogs = (req, res) => {
    res.status(200).json({ blogs: blogs });
}

//@desc     post a blog
//@route    POST /api/blogs
//@access   private
const postBlog = (req, res) => {
    (!req.body.content || !req.body.name) ?
        res.status(400).json({ message: "Please add blog name and content" }) :
        res.status(200).json({ blogs: [...blogs, req.body] });
}

//@desc     update a blog
//@route    PUT /api/blogs/:id
//@access   private
const putBlog = (req, res) => {
    if (!blogs.find(blog => req.params.id === blog.name)) {
        res.status(404)
        throw new Error("id not found");
    }
    res.status(200).json({ blogs: blogs.map(blog => blog.name === req.params.id ? { ...blog, content: req.body.text } : blog) });
}

//@desc     delete a blog
//@route    PUT /api/blogs/:id
//@access   private
const deleteBlog = (req, res) => {
    res.status(200).json({ blogs: blogs.filter(blog => blog.name !== req.params.id) });
}

module.exports = {
    getBlogs,
    postBlog,
    putBlog,
    deleteBlog
}


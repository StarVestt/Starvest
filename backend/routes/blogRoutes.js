const express = require("express");
const { getBlogs, postBlog, putBlog, deleteBlog } = require("../controllers/blogController");
const router = express.Router();

router.route("/").get(getBlogs).post(postBlog);

router.route("/:id").put(putBlog).delete(deleteBlog);

module.exports = router
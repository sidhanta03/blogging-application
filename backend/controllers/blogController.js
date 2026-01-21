const Blog = require('../models/Blog');

// @desc    Get all blogs (with optional filters)
// @route   GET /blogs
// @access  Private
const getBlogs = async (req, res) => {
    try {
        const { category, author } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        // Filtering by author name as per API req: ?author=:author
        // Since we store 'author' string in Blog model, we can query it directly.
        if (author) {
            query.author = author;
        }

        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new blog
// @route   POST /blogs
// @access  Private
const createBlog = async (req, res) => {
    try {
        const { title, category, content, image } = req.body;

        if (!title || !category || !content) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const blog = await Blog.create({
            title,
            category,
            content,
            image,
            author: req.user.name, // Populated from logged in user
            userId: req.user.id,
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog
// @route   PUT /blogs/:id
// @access  Private (Owner only)
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the blog user
        if (blog.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /blogs/:id
// @access  Private (Owner only)
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the blog user
        if (blog.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await blog.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Blog removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
};

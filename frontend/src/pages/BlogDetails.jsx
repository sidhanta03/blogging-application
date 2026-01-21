import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { motion } from 'framer-motion';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const { data } = await API.get('/blogs');
                const foundBlog = data.find(b => b._id === id);
                if (foundBlog) {
                    setBlog(foundBlog);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
            {blog.image && (
                <div className="h-96 w-full">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
                    <span className="px-3 py-1 font-semibold bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider">
                        {blog.category}
                    </span>
                    <span>
                        By <span className="font-semibold text-slate-900 dark:text-white">{blog.author}</span>
                    </span>
                    <span>•</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                    {blog.title}
                </h1>

                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                    {blog.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4 whitespace-pre-line">{paragraph}</p>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-blue-600 font-medium hover:underline flex items-center gap-2"
                    >
                        ← Back to Blogs
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogDetails;

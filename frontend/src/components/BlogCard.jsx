import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ blog, isOwner, onDelete, onEdit }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-full"
        >
            {blog.image && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider">
                        {blog.category}
                    </span>
                    <span className="text-xs text-slate-500">
                        • {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {blog.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flax-1">
                    {blog.content}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                            {blog.author[0].toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {blog.author}
                        </span>
                    </div>

                    {isOwner && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(blog)}
                                className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                title="Edit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => onDelete(blog._id)}
                                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                title="Delete"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;

import { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import BlogCard from '../components/BlogCard';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [filters, setFilters] = useState({ category: '', author: '' });
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            let query = '/blogs?';
            if (filters.category) query += `category=${filters.category}&`;
            if (filters.author) query += `author=${filters.author}`;

            const { data } = await API.get(query);
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [filters]);

    const categories = ["Technology", "Lifestyle", "Career", "Finance", "Travel", "Food"];

    return (
        <div>
            {/* Hero Section */}
            <div className="text-center mb-12 py-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
                    Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Great Stories</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Explore the latest insights, tutorials, and trends from our community of writers.
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setFilters({ ...filters, category: '' })}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${!filters.category
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilters({ ...filters, category: cat })}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filters.category === cat
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Filter by author..."
                        className="w-full md:w-64 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.author}
                        onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                    />
                </div>
            </div>

            {/* Blog Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No blogs found</h3>
                    <p className="text-slate-500">Try adjusting your filters or check back later.</p>
                </div>
            )}
        </div>
    );
};

export default Home;

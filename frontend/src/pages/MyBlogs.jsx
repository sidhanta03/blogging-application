import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import BlogCard from '../components/BlogCard';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchUserBlogs = async () => {
        try {
            // Assuming the backend has a way to filter by author name or we might need a dedicated endpoint
            // Requirements said: GET /blogs?category=:category&author=:author
            // Since 'author' in blog is a string name (per requirements), we filter by user.name
            // Ideally should filter by ID but we followed requirements.
            if (user?.name) {
                const { data } = await API.get(`/blogs?author=${user.name}`);
                // Client side filter to be sure (since name might not be unique if not enforced, but ID is check in delete/update)
                // Actually the backend endpoint for delete/update checks userId, so we are safe on security.
                // For display, name filter is what's available.
                // Better yet, let's just fetch all and filter by userId on client if backend only supports author name string filter
                // Wait, the backend /blogs endpoint returns all blogs filtered by author name.
                // Let's rely on that.
                setBlogs(data);
            }
        } catch (error) {
            console.error('Error fetching my blogs:', error);
            toast.error('Failed to load your blogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserBlogs();
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await API.delete(`/blogs/${id}`);
                setBlogs(blogs.filter((blog) => blog._id !== id));
                toast.success('Blog deleted successfully');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete blog');
            }
        }
    };

    const handleEdit = (blog) => {
        navigate(`/edit/${blog._id}`, { state: { blog } });
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Blogs</h1>
                    <p className="text-slate-500 mt-2">Manage your stories</p>
                </div>
                <button
                    onClick={() => navigate('/create')}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity"
                >
                    Write New
                </button>
            </div>

            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            isOwner={true}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">You haven't written any blogs yet</h3>
                    <p className="text-slate-500 mb-6">Start your journey as a writer today.</p>
                    <button
                        onClick={() => navigate('/create')}
                        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        Create Your First Blog
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyBlogs;

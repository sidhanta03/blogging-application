import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-200">
                            BlogSpheres
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                            Explore
                        </Link>

                        {user ? (
                            <>
                                <Link to="/create" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                                    Write
                                </Link>
                                <Link to="/my-blogs" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                                    My Blogs
                                </Link>
                                <div className="flex items-center gap-4 ml-2">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                        {user.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-medium transition-all text-sm"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 font-medium px-3 py-2">
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

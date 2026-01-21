import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import EditBlog from './pages/EditBlog';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* GET /blogs - Retrieve all blogs (accessible to logged-in users)."
           "All logged-in users can view all blogs".
           "Only logged-in users can access the APIs."
           "Redirect users to the login page if not authenticated."
        */}
        <Route index element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="create" element={
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        } />

        <Route path="my-blogs" element={
          <PrivateRoute>
            <MyBlogs />
          </PrivateRoute>
        } />

        <Route path="edit/:id" element={
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;

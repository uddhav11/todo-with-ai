// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile, logout, logoutUser, setUser } from "../redux/authSlice";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, token, loading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // Extract token & user from URL (Google OAuth login)
//     const urlParams = new URLSearchParams(window.location.search);
//     const tokenFromURL = urlParams.get("token");
//     const userFromURL = urlParams.get("user");

//     if (tokenFromURL && userFromURL) {
//       const parsedUser = JSON.parse(decodeURIComponent(userFromURL));

//       // Save to Redux & LocalStorage
//       dispatch(setUser({ user: parsedUser, token: tokenFromURL }));

//       // Remove token from URL
//       window.history.replaceState({}, document.title, "/dashboard");
//     } else if (!user && token) {
//       dispatch(getProfile()); // Fetch profile if user is missing
//     }
//   }, [dispatch, token, user]);

//   const handleLogout = () => {
//     dispatch(logout());
//     dispatch(logoutUser());
//     navigate("/login");
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!user) return <p>User not found. Please log in.</p>;

//   return (
//     <div>
//       <h1>{user.name}</h1>
//       <p>{user.email}</p>
//       <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-700 font-bold">
//         Logout
//       </button>
//       <p>Dashboard</p>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logoutUser, setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Extract token & user from URL (Google OAuth login)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");
    const userFromURL = urlParams.get("user");

    if (tokenFromURL && userFromURL) {
      const parsedUser = JSON.parse(decodeURIComponent(userFromURL));

      // Save to Redux & LocalStorage
      dispatch(setUser({ user: parsedUser, token: tokenFromURL }));

      // Remove token from URL
      window.history.replaceState({}, document.title, "/dashboard");
    } else if (!user && token) {
      dispatch(getProfile()); // Fetch profile if user is missing
    }
  }, [dispatch, token, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!user) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">User not found. Please log in.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="mr-3 text-lg font-bold text-gray-900">
                Welcome, {user.name}
              </div>
              
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {user.name}'s Task Dashboard
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {user.email} | {new Date().toLocaleDateString()}
            </p>
          </div>
          
          {/* Task Management Section */}
          <TaskList />
        </div>
      </main>

      <div className=" items-center justify-center space-x-4">
            <div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>

      

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Task Manager App
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
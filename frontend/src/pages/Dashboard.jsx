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





// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile, logoutUser, setUser } from "../redux/authSlice";
// import { useNavigate } from "react-router-dom";
// import TaskList from "./TaskList";

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
//     dispatch(logoutUser());
//     navigate("/login");
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   if (!user) return (
//     <div className="flex justify-center items-center h-screen">
//       <p className="text-xl">User not found. Please log in.</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-300">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <div className="mr-3 text-lg font-bold text-gray-900">
//                 Welcome, {user.name}
//               </div>
              
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="mb-6">
//             <h2 className="text-lg font-medium text-gray-900">
//               {user.name}'s Task Dashboard
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               {user.email} | {new Date().toLocaleDateString()}
//             </p>
//           </div>
          
//           {/* Task Management Section */}
//           <TaskList />
//         </div>
//       </main>

//       <div className=" items-center justify-center space-x-4">
//             <div>
              
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

      

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200 mt-8">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
//           <p className="text-center text-sm text-gray-500">
//             © {new Date().getFullYear()} Task Manager App
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logoutUser, setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import { FiLogOut, FiUser, FiCalendar } from "react-icons/fi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localUser= JSON.parse(localStorage.getItem('user'))
  let { user, token, loading } = useSelector((state) => state.auth);



  useEffect(() => {
    // const localToken= localStorage.getItem('token')
    // const localUser= JSON.parse(localStorage.getItem('user'))



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
    
    
    }else if(!user && token) {
      dispatch(getProfile()); // Fetch profile if user is missing
    } 
  }, );
// }, [dispatch, token, user]);

  // useEffect(() => {
  //   dispatch(getProfile())
  // })

  useEffect(() => {
    console.log("User in useEffect:", user);
    console.log("Token in useEffect:", token);
    console.log("LocalStorage user:", localStorage.getItem("user"));
    console.log("URL token param:", new URLSearchParams(window.location.search).get("token"));
    console.log("URL user param:", new URLSearchParams(window.location.search).get("user"));
  }, [user, token]);
  


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-xl text-purple-300">User not found. Please log in.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              NeuroTask
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600/30 text-purple-300">
                <FiUser />
              </div>
              <div className="text-lg font-medium text-purple-300">
                {user.name}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg border border-red-600/20 transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 p-6 backdrop-blur-sm">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-purple-300">
                  {user.name}'s Dashboard
                </h2>
                <div className="flex items-center mt-1 text-sm text-gray-400">
                  <FiUser className="mr-1" />
                  <span className="mr-3">{user.email}</span>
                  <FiCalendar className="mr-1" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-3 md:mt-0">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium px-2 py-1 bg-purple-900/30 text-purple-300 rounded-full border border-purple-700/30">
                    {user.role || 'User'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Task Management Section */}
          <TaskList />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} NeuroTask - Productivity Manager
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
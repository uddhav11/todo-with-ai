

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   // Handle normal register
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/register",
//         { name, email, password },
//         { withCredentials: true }
//       );
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error.response?.data?.error || "Register error");
//     }
//   };

//   // Corrected Google Register
//   const handleGoogleRegister = async (credentialResponse) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/auth/google/callback",
//         { token: credentialResponse.credential }, // Send Google JWT
//         { withCredentials: true }
//       );
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Google register failed", error);
//     }
//   };

//   return (
//     <>
//       <h1>Register</h1>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>

//       <GoogleOAuthProvider clientId="210900703088-ifehcpj6llsqcgi1i4l1l99856fp92oq.apps.googleusercontent.com">
//         <GoogleLogin
//           onSuccess={handleGoogleRegister}
//           onError={() => console.error("Google register error")}
//         />
//       </GoogleOAuthProvider>
//     </>
//   );
// };

// export default Register;






import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, googleLogin } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { loading, error } = useSelector((state) => state.auth);


  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    navigate('/login')
    setName('')
    setEmail('')
    setPassword('')
    
  };


  const handleGoogleLogin = () => {
    dispatch(googleLogin());
    Navigate('/dashboard')
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">NeuroTask</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
          <p className="text-gray-300 mt-1">Join us to boost your productivity</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mx-6 mt-4">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleRegister} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-400 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-400 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-white placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Register"
              )}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
          </button>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
              I agree to the <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Terms</span> and <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Privacy Policy</span>
            </label>
          </div>
        </form>

        {/* Social Login */}
        <div className="px-6 pb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or register with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-3 rounded-lg border border-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        {/* Login Link */}
        <div className="bg-gray-700/50 px-6 py-4 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
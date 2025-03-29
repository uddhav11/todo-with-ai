// import React, { useState } from "react";
// import axios from "axios";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         { email, password }
//       );
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error.response?.data?.error || "Login error");
//     }
//   };

//   const handleGoogleLogin= async (credentislResponse) => {
//     try {
//         const response= await axios.get('http://localhost:4000/api/auth/google/callback', {
//             headers: {
//                 Authorization: `Bearer ${credentislResponse.accessToken}`
//             }
//         });
//         localStorage.setItem('token', response.data.token);
//         navigate('/dashboard');
//     } catch (error) {
//         console.error('Google login failed')

//     }
//   }

//   return (
//     <>
//         <h1>Login</h1>
//         <form onSubmit={handleLogin}>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Login</button>
//             </form>

//             <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
//                 <GoogleLogin
//                 onSuccess={handleGoogleLogin}
//                onError={() => console.error('Google login error')}
//                 />
//             </GoogleOAuthProvider>
//     </>
//   )
// };

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         { email, password }
//       );
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error.response?.data?.error || "Login error");
//     }
//   };

//   const handleGoogleLogin = async (credentialsResponse) => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/api/auth/google/callback",
//         {
//           headers: {
//             Authorization: `Bearer ${credentialsResponse.accessToken}`,
//           },
//         }
//       );
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Google login failed");
//       console.log('login error', error)
//     }
//   };

//   return (
//     <>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
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
//         <button type="submit">Login</button>
//       </form>

//       <GoogleOAuthProvider clientId={'210900703088-ifehcpj6llsqcgi1i4l1l99856fp92oq.apps.googleusercontent.com'}>
//         <GoogleLogin
//           onSuccess={handleGoogleLogin}
//           onError={() => console.error("Google login error")}
//         />
//       </GoogleOAuthProvider>
//     </>
//   );
// };

// export default Login;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");

//     if (token) {
//       // Store token & navigate to dashboard
//       localStorage.setItem("token", token);
//       navigate("/dashboard");
//     }
//   }, []);

//   // Handle normal login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error.response?.data?.error || "Login error");
//     }
//   };

//   // Handle Google Login Redirect
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:4000/api/auth/google";
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <form onSubmit={handleLogin} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Login
//         </button>
//       </form>

//       <div className="mt-4">
//         <button
//           onClick={handleGoogleLogin}
//           className="bg-red-500 text-white px-6 py-2 rounded-lg"
//         >
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    navigate('/dashboard')
  };

  const handleGoogleLogin = () => {
    // Redirect directly to Google login URL
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border border-black rounded-xl text-xl m-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 border border-black rounded-xl text-xl m-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-blue-400 rounded-xl py-2 text-white bg-blue-500 font-bold text-xl m-2 hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="border-gray-500 border px-6 py-2 rounded-2xl bg-gray-500 text-white font-bold mt-2 hover:bg-gray-600"
      >
        Login with Google
      </button>
      <Link to={'/register'} className="px-4 py-2 bg-blue-400 text-black rounded-2xl m-3">Register</Link>
    </div>
  );
};

export default Login;

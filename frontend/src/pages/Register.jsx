

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
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col m-10">
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border-black border rounded-xl text-xl m-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border-black border rounded-xl text-xl m-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 border-black border rounded-xl text-xl m-2"
        />
        <button className="border border-blue-400 rounded-xl py-1 text-white bg-blue-400 font-bold text-2xl">
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="border-gray-500 border px-6 py-2 rounded-2xl bg-gray-500 text-white font-bold hover:cursor-pointer">
        Register with Google
      </button>
      <Link to={'/login'} className="px-4 py-2 bg-blue-400 text-white font-bold rounded-2xl">Log in</Link>
    </div>
  );
};

export default Register;
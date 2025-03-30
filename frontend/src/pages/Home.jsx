import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>This is Home Page</h1> <br />
      <Link to={"/login"} className="px-4 py-2 text-white font-bold m-2 bg-blue-500 rounded-2xl">
        Login
      </Link>
      <Link to={"/dashboard"} className="px-4 py-2 text-white font-bold bg-green-500 rounded-2xl">
        Dashboard
      </Link>
    </div>
  );
};

export default Home;

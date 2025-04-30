import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

// Helper function to get user safely
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

// Protected Route wrapper
function PrivateRoute({ children }) {
  const user = getUser();
  return user ? children : <Navigate to="/" />;
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/dashboard");
    } else if (!user && location.pathname === "/dashboard") {
      navigate("/");
    }
  }, [location.pathname, navigate, user]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

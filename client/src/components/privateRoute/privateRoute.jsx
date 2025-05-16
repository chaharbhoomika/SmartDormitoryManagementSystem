import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Replace with your actual path

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Assuming you provide user via context

  // If not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is admin, block access
  if (user.isAdmin) {
    return <Navigate to="/clientAccess" />;
  }

  // Otherwise, allow access
  return children;
};

export default PrivateRoute;

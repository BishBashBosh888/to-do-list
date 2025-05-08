import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = "/" }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("protected route", user, loading);
    if (!loading) {
      if (requireAuth && !user) {
        console.log("redirecting to login");
        navigate("/login");
      } else if (!requireAuth && user) {
        console.log("redirecting to ", redirectTo);
        navigate(redirectTo); 
      }
    }
  }, [user, loading, navigate, requireAuth, redirectTo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated and the route is protected, render the children
  return children;
};

export default ProtectedRoute;
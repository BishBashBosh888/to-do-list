import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UnauthenticatedRoute = ({ children, redirectTo = "/" }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner"></div>
        </div>
      );
  }

  return children;
};

export default UnauthenticatedRoute;
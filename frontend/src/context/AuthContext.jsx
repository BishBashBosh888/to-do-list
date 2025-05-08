import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAuthToken();
        if (token) {
          const res = await axios.get("http://localhost:5000/api/auth/me", {
            withCredentials: true,
            headers: { "x-auth-token": token },
          });
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials,
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true
      });
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5001/api/auth/check", {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking authentication...</div>;

  return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

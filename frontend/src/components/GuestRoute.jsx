import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API_URL from "../services/api";

function GuestRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-500">
          Checking authentication...
        </p>
      </div>
    );
  }

  // Already logged in → don't allow Login/Register
  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Not logged in → show Login/Register
  return children;
}

export default GuestRoute;
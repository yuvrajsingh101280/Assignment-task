import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // Check current user using /api/auth/user
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/auth/user");
        if (res.data?.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async ({ name, email, password }) => {
    setAuthLoading(true);
    try {
      const res = await api.post("/api/auth/signup", { name, email, password });
      if (!res.data?.success) {
        return {
          success: false,
          message: res.data?.message || "Signup failed",
        };
      }
      setUser(res.data.user);
      return {
        success: true,
        message: res.data.message || "User created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setAuthLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });

      // your backend sometimes returns success: false with status 200
      if (!res.data?.success) {
        return {
          success: false,
          message: res.data?.message || "Login failed",
        };
      }

      setUser(res.data.user);
      return { success: true, message: res.data.message || "Login successful" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      // ignore error
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        checkingAuth,
        authLoading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

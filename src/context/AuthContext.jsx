import { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/users/profile");
      setUser(data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const register = async ({ name, email, password }) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    await checkAuthStatus(); // refetch full profile instead of trusting the login response shape
  };

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    await checkAuthStatus(); // same here
  };

  const updateProfile = async (payload) => {
    const { data } = await api.put("/auth/profile", payload);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        updateProfile,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser(token);
        setUser(currentUser);
      } catch (error) {
        console.error(error);
        logout();
      }

      setLoading(false);
    }

    loadUser();
  }, [token]);

  async function login(email, password) {
    const data = await loginUser({
      email,
      password,
    });

    localStorage.setItem("token", data.access_token);

    setToken(data.access_token);
    setUser(data.user);

    return data;
  }

  async function register(username, email, password) {
    return await registerUser({
      username,
      email,
      password,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("authToken")
  );

  const login = (loginToken) => {
    localStorage.setItem("authToken", loginToken);
    setToken(loginToken);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const isAuthenticated = Boolean(token);

  console.log(token, "auth token");

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

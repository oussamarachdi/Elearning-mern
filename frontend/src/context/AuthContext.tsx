import { createContext, useState, type ReactNode, useEffect } from "react";
import type { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  isLogged: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogged: false,
  login: () => { },
  logout: () => { },
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load from localStorage once when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const hasToken = localStorage.getItem("accessToken");

    if (storedUser && hasToken) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLogged(true);
      } catch (e) {
        console.error("Failed to parse user from local storage");
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = (user: User, accessToken: string, refreshToken: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    setUser(user);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLogged(false);
    window.location.href = "/login"; // auto redirect
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  getAuthToken,
  removeAuthToken,
  storeAuthToken,
} from "../lib/auth";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(getAuthToken())
  );

  function login(token: string) {
    storeAuthToken(token);
    setIsAuthenticated(true);
  }

  function logout() {
    removeAuthToken();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}

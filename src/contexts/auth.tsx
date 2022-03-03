import { ApiError, User } from "@supabase/supabase-js";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

type UseAuth = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<{ error: ApiError | null }>;
  logout: () => Promise<void>;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<{ error: ApiError | null }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = async (email: string) => {
    const { error } = await supabase.auth.signIn({ email });
    return { error };
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };
  const initUser = () => {
    setUser(supabase.auth.user());
    setIsAuthenticated(supabase.auth.user() !== null);
  };
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      await axios.post("/api/set-cookie", {
        event: session ? "SIGNED_IN" : "SIGNED_OUT",
        session: session,
      });
    });
    initUser();
    return () => {
      data?.unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): UseAuth => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return {
      user: null,
      isAuthenticated: false,
      login: () => Promise.resolve({ error: null }),
      logout: () => Promise.resolve(),
    };
  }
  return {
    user: authContext.user,
    isAuthenticated: authContext.isAuthenticated,
    login: authContext.login,
    logout: authContext.logout,
  };
};

import { createContext, useContext, useState } from "react";
import AuthService from "./AuthService";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const loginWithGoogle = async () => {
    const { error, user } = await AuthService.loginWithGoogle();
    setUser(user ?? null);
    setError(error ?? null);
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  return (
    <authContext.Provider
      value={{ user, loginWithGoogle, logout, error }}
      {...props}
    />
  );
}

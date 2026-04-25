import { createContext, useContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, logout } from "../firebase";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const { data } = await api.get("/users/profile");
          setProfile(data);
        } catch (error) {
          console.log("No profile found yet, user needs to register.");
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    await signInWithGoogle();
  };

  const register = async (role, name) => {
    const { data } = await api.post("/users/register", { role, name });
    setProfile(data);
  };

  const value = {
    user,
    profile,
    loading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

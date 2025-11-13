import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseToken, setFirebaseToken] = useState(null);

  const register = async (email, password, displayName, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const profileUpdates = { displayName };
      if (photoURL) {
        profileUpdates.photoURL = photoURL;
      }
      await updateProfile(userCredential.user, profileUpdates);
      const token = await userCredential.user.getIdToken();
      setFirebaseToken(token);
      localStorage.setItem("firebaseToken", token);
      setLoading(false);
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      setFirebaseToken(token);
      localStorage.setItem("firebaseToken", token);
      setLoading(false);
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const token = await userCredential.user.getIdToken();
      setFirebaseToken(token);
      localStorage.setItem("firebaseToken", token);
      setLoading(false);
      return userCredential.user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setFirebaseToken(null);
      localStorage.removeItem("firebaseToken");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = await currentUser.getIdToken();
        setFirebaseToken(token);
        localStorage.setItem("firebaseToken", token);
      } else {
        setFirebaseToken(null);
        localStorage.removeItem("firebaseToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authinfo = {
    register,
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    firebaseToken,
  };

  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

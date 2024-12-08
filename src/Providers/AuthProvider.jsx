import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  // Create user function
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with name and photo URL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      setUser(user); // Update user state
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message); // Set error message
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in user function
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUser(user); // Update user state
      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message); // Set error message
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOutUser = async () => {
    try {
      await signOut(auth); // Firebase signOut function
      setUser(null); // Clear user from state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  setLoading(true);
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    setUser(user); // Update user state
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    setError(error.message); // Set error message
    throw error;
  } finally {
    setLoading(false);
  }
};

  // Firebase auth state listener to handle user persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const userInfo = {
    user,
    loading,
    error,
    createUser,
    signInUser, // Expose signInUser function
    signOutUser, // Expose signOutUser function
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

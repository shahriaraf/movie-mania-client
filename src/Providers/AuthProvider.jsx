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

// Context to provide user state and auth functions
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state for handling authentication errors

  // Function to create a new user
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

      setUser(user); // Update the user state with the newly created user
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message); // Set error message to be displayed
      throw error;
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to sign in a user
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user); // Update the user state after successful sign-in
      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message); // Set error message to be displayed
      throw error;
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to sign out the user
  const signOutUser = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      setUser(null); // Clear the user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Google Authentication Provider
  const googleProvider = new GoogleAuthProvider();

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user); // Update user state with Google login details
      return user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message); // Set error message to be displayed
      throw error;
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Firebase Auth state listener to maintain session persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state whenever the authentication state changes
      setLoading(false); // Set loading to false when done checking auth state
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Context value to expose user state and auth functions
  const userInfo = {
    user,
    loading,
    error,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children} {/* Render children with access to the auth context */}
    </AuthContext.Provider>
  );
};

// Display error messages to the user
const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <div style={{ color: 'red', padding: '10px', backgroundColor: '#f8d7da' }}>
      {error}
    </div>
  );
};

export default AuthProvider;

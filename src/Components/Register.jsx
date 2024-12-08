

import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // For navigation after login

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Reset error and success messages
    setError("");
    setSuccessMessage("");

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    ("Sign up", { name, photo, email, password });

    createUser(email, password, name, photo)
      .then((result) => {
        ("User created successfully:", result);
        setSuccessMessage("Registration successful! Please log in.");
        navigate("/");

        // Reset the form after successful user creation
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setError("Error creating account. Please try again.");
      });
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); // Navigate to home page after successful login
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setError("Failed to authenticate with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="w-full max-w-md p-8 bg-gray-900/75 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">MovieMania</h1>
        <p className="mt-2 text-center text-gray-400">Join us and explore the world of movies!</p>

        {/* Display error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Display success message */}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          {/* Name, Email, Photo, Password fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium">Photo</label>
            <input type="text" id="photo" name="photo" placeholder="Enter Photo URL" className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-3 rounded-lg font-semibold text-white shadow-md">Sign Up</button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">Already have an account? <Link className="text-blue-600 hover:underline" to="/login">Log in</Link></p>
        </div>

        {/* Google Sign-In Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-slate-300 hover:bg-slate-500 transition-colors py-3 rounded-lg font-semibold text-black shadow-md"
          >
            Sign in with Google <i className="fa-brands fa-google"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

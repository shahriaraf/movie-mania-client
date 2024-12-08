



import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation after login
import { AuthContext } from "../Providers/AuthProvider"; // Import the context

const Login = () => {
  const { signInUser, error, signInWithGoogle } = useContext(AuthContext); // Get signInUser and error from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
      navigate("/"); // Redirect to homepage after successful login
    } catch (err) {
      console.error("Login error", err);
    }

   
  };
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
        <p className="mt-2 text-center text-gray-400">Sign in to explore the world of movies!</p>

        {/* Error message from context */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-3 rounded-lg font-semibold text-white shadow-md"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/register">
              Sign up
            </Link>
          </p>
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


export default Login;



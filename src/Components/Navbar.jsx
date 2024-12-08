import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider"; // Import the context

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext); // Get user and signOutUser from context
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility

  const handleSignOut = async () => {
    await signOutUser(); // Call signOutUser to log the user out
    setIsDrawerOpen(false); // Close the drawer after logging out
  };

  const closeDrawer = () => setIsDrawerOpen(false); // Close the drawer on menu item click

  return (
    <div className="navbar bg-black text-white p-4">
      <div className="navbar-start">
        {/* Drawer Toggle */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>

        {/* Company Photo */}
        <Link to="" className="flex items-center space-x-2">
          <img
            className="w-16 h-16 rounded-full"
            src="https://i.ibb.co.com/R0bHFhq/images-10.jpg"
            alt="page logo"
          />
        </Link>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeDrawer}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-64 bg-black text-white h-full shadow-lg">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={closeDrawer}
            >
              ✕
            </button>
            <ul className="menu p-4">
              <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                <Link to="" onClick={closeDrawer}>
                  Home
                </Link>
              </li>
              <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                <Link to="all-movies" onClick={closeDrawer}>
                  Movies
                </Link>
              </li>
              <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                <Link to="tv-series" onClick={closeDrawer}>
                  TV Series
                </Link>
              </li>
              <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                <Link to="add-movies" onClick={closeDrawer}>
                  Add Movies
                </Link>
              </li>
              <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                <Link to="favorite-movies" onClick={closeDrawer}>
                  Favorite Movies
                </Link>
              </li>
              {!user ? (
                <>
                  <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                    <Link to="login" onClick={closeDrawer}>
                      Login
                    </Link>
                  </li>
                  <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                    <Link to="register" onClick={closeDrawer}>
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-700 font-semibold text-white px-3 py-2 rounded-lg"
                  >
                    Log out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Normal Navbar for Larger Screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
            <Link to="">Home</Link>
          </li>
          <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
            <Link to="all-movies">Movies</Link>
          </li>
          <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
            <Link to="tv-series">TV Series</Link>
          </li>
          <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
            <Link to="add-movies">Add Movies</Link>
          </li>
          <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
            <Link to="favorite-movies">Favorite Movies</Link>
          </li>
          {!user ? (
            <>
              <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                <Link to="login">Login</Link>
              </li>
              <li className="text-[16px] hover:bg-gray-200 rounded-md hover:text-black">
                <Link to="register">Register</Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <img
                className="w-12 h-12 rounded-full"
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="user avatar"
              />
              <div className="absolute top-4 right-2 mb-2 hidden group-hover:flex justify-center items-center bg-transparent text-white text-lg px-3 py-1 rounded shadow-lg">
                {user.displayName || "User"}
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="bg-red-500 hidden lg:inline hover:bg-red-700 font-semibold text-white px-3 py-2 rounded-lg"
            >
              Log out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;

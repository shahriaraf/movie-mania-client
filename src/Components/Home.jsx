import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import FeaturedMovies from "./FeaturedMovies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
 
  const [theme, setTheme] = useState("dark"); // Theme state


  useEffect(() => {
    // Apply theme to body
    document.body.className = theme;
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`home-page ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}`}>
       {/* Banner Section */}
       <Banner />
      {/* Floating Theme Toggle Button */}
      <div className="flex justify-end"> <button
        onClick={toggleTheme}
        className={`${theme === "dark" ? "p-2 mr-5 mt-3 bg-black text-white text-xl rounded-full shadow-sm shadow-gray-200 hover:bg-gray-200 hover:text-black transition" : "p-2 mr-5 mt-3 bg-gray-200 text-black text-xl rounded-full shadow-lg hover:bg-black hover:text-gray-200 transition"}`}
      >
        <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} size="lg" />
      </button></div>
     


      {/* Featured Movies Section */}
      <FeaturedMovies theme={theme} />

     
     
    </div>
  );
};

export default Home;

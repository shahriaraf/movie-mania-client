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
      <div className="flex justify-end">
        <button
          onClick={toggleTheme}
          className={`${
            theme === "dark"
              ? "p-2 mr-5 mt-3 bg-black text-white text-xl rounded-full shadow-sm shadow-gray-200 hover:bg-gray-200 hover:text-black transition"
              : "p-2 mr-5 mt-3 bg-gray-200 text-black text-xl rounded-full shadow-lg hover:bg-black hover:text-gray-200 transition"
          }`}
        >
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} size="lg" />
        </button>
      </div>

      {/* Featured Movies Section */}
      <FeaturedMovies theme={theme} />

      {/* Top Genres Section */}
      <div className="top-genres-section py-10 px-5">
        <h2 className="text-2xl font-bold mb-5 text-center">🎬 Top Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Documentary"].map((genre, index) => (
            <div
              key={index}
              className={`genre-card p-5 rounded-lg shadow-gray-400 shadow-md ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
              } hover:shadow-lg hover:scale-105 transition transform`}
            >
              <h3 className="text-lg font-semibold text-center">{genre}</h3>
            </div>
          ))}
        </div>
      </div>

     {/* Upcoming Releases Section */}
<div className="upcoming-releases-section py-10 px-5">
  <h2 className="text-2xl font-bold mb-5 text-center">🍿 Upcoming Releases</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[
      {
        title: "Avatar: The Way of Water",
        date: "December 16, 2024",
        description: "Dive into the next chapter of Pandora with breathtaking visuals.",
        image: "https://i.ibb.co.com/HnXdDnd/images-12.jpg", // Placeholder image
      },
      {
        title: "The Batman: Rebirth",
        date: "March 25, 2025",
        description: "A dark and gritty tale exploring the roots of Gotham's hero.",
        image: "https://i.ibb.co.com/34JKDHn/37489651.jpg", // Placeholder image
      },
      {
        title: "Superman Legacy",
        date: "July 20, 2025",
        description: "Where the legacy begins",
        image: "https://i.ibb.co.com/yYBjJhc/images-13.jpg", // Placeholder image
      },
    ].map((movie, index) => (
      <div
        key={index}
        className={`release-card p-5 rounded-lg shadow-md ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        } hover:shadow-lg hover:scale-105 transition transform`}
      >
        {/* Movie Image */}
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
        {/* Movie Title */}
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        {/* Release Date */}
        <p className="text-sm text-gray-500 mb-2">{movie.date}</p>
        {/* Description */}
        <p>{movie.description}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Home;

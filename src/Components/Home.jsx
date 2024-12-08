import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import FeaturedMovies from "./FeaturedMovies";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [theme, setTheme] = useState("dark"); // Theme state
  const navigate = useNavigate();

  useEffect(() => {
    // Apply theme to body
    document.body.className = theme;

    // Fetch latest movies
    const fetchLatestMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies/latest");
        const data = await response.json();
        setLatestMovies(data);
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    };

    // Fetch genres
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies/genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchLatestMovies();
    fetchGenres();
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

      {/* Latest Releases Section */}
      <div className="latest-releases py-10 mt-14">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {latestMovies.map((movie) => (
              <div
                key={movie._id}
                className={`movie-card p-4 rounded-lg shadow-lg transition transform hover:scale-105 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-800"
                }`}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">Release Year: {movie.releaseYear}</p>
                  <button
                    onClick={() => navigate(`/movie-details/${movie._id}`)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg"
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Genres Section */}
      <div className={`top-genres mt-14 py-10 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Top Genres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {genres.map((genre) => (
              <div
                key={genre.genre}
                className={`genre-card p-6 rounded-lg shadow-lg text-center transition transform hover:scale-105 ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-700 text-gray-200"
                }`}
              >
                <h3 className="text-xl font-bold">{genre.genre}</h3>
                <p className="text-gray-400">{genre.count} Movies</p>
                <button
                  onClick={() => navigate(`/movies/genre/${genre.genre}`)}
                  className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  See Movies
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component"; // Import ReactStars

const FeaturedMovies = ({ theme }) => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch 6 highest-rated movies
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies/featured");
        const data = await response.json();
        setFeaturedMovies(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className={`featured-movies py-10 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {featuredMovies.map((movie) => (
            <div key={movie._id} className="movie-card bg-gray-800 p-4 rounded-lg shadow-lg transition transform hover:scale-105">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">Genre: {movie.genre}</p>
                <p className="text-sm text-gray-400">Duration: {movie.duration} mins</p>
                <p className="text-sm text-gray-400">Release Year: {movie.releaseYear}</p>

                {/* Star Rating */}
                <div className="text-sm text-gray-400 flex items-center">
                  <ReactStars
                    count={5}
                    value={movie.rating} // Pass the numeric rating to ReactStars
                    size={20} // Adjust the size as needed
                    isHalf={true} // Allow half-stars
                    edit={false} // Make it non-editable
                    activeColor="#ffd700" // Set color for active stars (gold)
                  />
                </div>

                <div className="mt-4">
                  {/* Use Link for navigation */}
                  <Link to={`/movie-details/${movie._id}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/all-movies")}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg text-lg"
          >
            See All Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovies;




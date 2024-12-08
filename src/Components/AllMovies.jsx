

import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component'; // Import the stars component
import { Link } from 'react-router-dom';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/movies');
        if (response.ok) {
          const data = await response.json();
          setMovies(data.movies); // Assuming the response has a 'movies' field
        } else {
          console.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive search
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      
      {/* Search input */}
      <div className="mb-8 text-start">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          className="p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/3 mx-auto"
        />
      </div>

      {/* Movies grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie._id} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-400">{movie.genre}</p>
                <p className="text-sm text-gray-400">Duration: {movie.duration} min</p>
                <p className="text-sm text-gray-400">Release Year: {movie.releaseYear}</p>
                <p className="text-sm text-gray-400">{movie.summary}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">Rating: {movie.rating}/5</p>
                  <ReactStars
                    count={5}
                    value={movie.rating} // Pass the numeric rating to ReactStars
                    size={20} // Adjust the size as needed
                    isHalf={true} // Allow half-stars
                    edit={false} // Make it non-editable
                    activeColor="#ffd700" // Set color for active stars (gold)
                  />
                </div>
                <p className="mt-2 text-gray-400">Email: {movie.email}</p>
              </div>
              <Link to={`/movie-details/${movie._id}`}>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg">
                  See Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default AllMovies;

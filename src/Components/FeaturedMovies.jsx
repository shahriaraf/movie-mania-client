import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars'; // Import the React Stars component

const FeaturedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate for navigation

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await axios.get('https://movie-mania-server-gules.vercel.app/movies/featured');
        if (response.data.success) {
          setMovies(response.data.movies);
        } else {
          setError('Failed to load featured movies');
        }
      } catch (err) {
        setError('Failed to load featured movies');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  const handleMovieDetails = (id) => {
    // Navigate to the movie details page using useNavigate
    navigate(`/movie-details/${id}`);
  };

  if (loading) {
    return <div>Loading featured movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className='pb-5'>
      <h2 className="text-3xl font-bold text-center mb-8">Featured Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="border rounded-lg overflow-hidden shadow-md">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-500">{movie.genre}</p>
              <p className="text-sm text-gray-500">{movie.duration} mins</p>
              <p className="text-sm text-gray-500">Release Year: {movie.releaseYear}</p>
              <div className="text-sm text-gray-500">
              <ReactStars
                    count={5}
                    value={movie.rating} // Pass the numeric rating to ReactStars
                    size={20} // Adjust the size as needed
                    isHalf={true} // Allow half-stars
                    edit={false} // Make it non-editable
                    activeColor="#ffd700" // Set color for active stars (gold)
                  />
              </div>
              <button
                onClick={() => handleMovieDetails(movie._id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/all-movies')} // Navigate to the all movies page
          className="px-6 py-3 bg-blue-700 text-white rounded hover:bg-green-600"
        >
          See All Movies
        </button>
      </div>
    </div>
  );
};

export default FeaturedMovies;

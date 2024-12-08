import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://movie-mania-server-o47gvq2qo-shoumo-shahriar-arafs-projects.vercel.app/movies/${id}`);
        if (response.data) {
          setMovie(response.data);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleDeleteMovie = async () => {
    try {
      await axios.delete(`https://movie-mania-server-o47gvq2qo-shoumo-shahriar-arafs-projects.vercel.app/movies/${id}`);
      navigate('/all-movies'); // Navigate back to all movies page
    } catch (err) {
      setError('Failed to delete movie');
    }
  };

  const handleAddToFavorites = async () => {
    try {
      await axios.post('https://movie-mania-server-o47gvq2qo-shoumo-shahriar-arafs-projects.vercel.app/favorites', { movieId: id });
      alert('Movie added to favorites');
    } catch (err) {
      setError('Failed to add movie to favorites');
    }
  };

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-900">
      <h2 className="text-3xl text-center font-bold mb-4">{movie.title}</h2>
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-96 object-cover mb-4" />
      <p className='text-gray-400'><strong>Genre:</strong> {movie.genre}</p>
      <p className='text-gray-400'><strong>Duration:</strong> {movie.duration} mins</p>
      <p className='text-gray-400'><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p className='text-gray-400'><strong>Rating:</strong> {movie.rating}</p>
      <p className='text-gray-400'><strong>Description:</strong> {movie.description}</p>

      <div className="mt-4">
        <button
          onClick={handleDeleteMovie}
          className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 mr-4"
        >
          Delete Movie
        </button>

        <button
          onClick={handleAddToFavorites}
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add to Favorites
        </button>
      </div>
      <div>
      {/* Other movie details */}
      <button
        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg mt-4"
        onClick={() => navigate(`/update-movie/${movie._id}`)}
      >
        Update Movie
      </button>
    </div>
    </div>
  );
};

export default MovieDetails;

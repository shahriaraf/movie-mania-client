import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/movies/${id}`);
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const deleteMovie = async () => {
    try {
      const response = await fetch(`http://localhost:5000/movies/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigate('/all-movies');
      } else {
        console.error('Failed to delete movie');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const addToFavorite = async () => {
    try {
      const response = await fetch('http://localhost:5000/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'user@example.com', // Replace with user's email from context
          movie,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add to favorites');
        return;
      }

      alert('Movie added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('An error occurred while adding to favorites');
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover rounded-t-lg"
        />
        <div className="mt-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-lg mt-2">Genre: {movie.genre}</p>
          <p className="text-lg">Duration: {movie.duration} mins</p>
          <p className="text-lg">Release Year: {movie.releaseYear}</p>
          <p className="text-lg">Rating: {movie.rating}/10</p>
          <p className="text-lg mt-4">{movie.summary}</p>

          {/* Buttons for deleting and adding to favorites */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={deleteMovie}
              className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-lg"
            >
              Delete Movie
            </button>
            <button
              onClick={addToFavorite}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg"
            >
              Add to Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="text-end mt-5 pb-10 pr-10">
      <button
        onClick={() => navigate("/all-movies")}
        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg text-lg"
      >
        See All Movies
      </button>
    </div>
  </div>
  );
};

export default MovieDetails;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMovie = () => {
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the existing movie data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://movie-mania-server-gules.vercel.app/${id}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        setError('Failed to load movie data');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedMovie = Object.fromEntries(formData.entries());

    // Validate inputs (similar to Add Movie form)
    if (!updatedMovie.title || !updatedMovie.genre) {
      setError('Title and Genre are required');
      return;
    }

    try {
      const response = await fetch(`https://movie-mania-server-gules.vercel.app/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMovie),
      });

      if (!response.ok) throw new Error('Failed to update movie');
      navigate('/'); // Redirect to the homepage or movie list
    } catch (error) {
      setError('Error updating movie');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 text-white">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={movieData.title}
          className="w-full p-2 border rounded-lg bg-gray-900 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Genre</label>
        <input
          type="text"
          name="genre"
          defaultValue={movieData.genre}
          className="w-full p-2 border rounded-lg bg-gray-900 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Duration</label>
        <input
          type="number"
          name="duration"
          defaultValue={movieData.duration}
          className="w-full p-2 border rounded-lg bg-gray-900 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Release Year</label>
        <input
          type="number"
          name="releaseYear"
          defaultValue={movieData.releaseYear}
          className="w-full p-2 border rounded-lg bg-gray-900 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rating</label>
        <input
          type="number"
          name="rating"
          defaultValue={movieData.rating}
          step="0.1"
          max="10"
          className="w-full p-2 border rounded-lg bg-gray-900 text-white"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-500 py-2 px-6 rounded-lg"
      >
        Update Movie
      </button>
    </form>
  );
};

export default UpdateMovie;



import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const FavoriteMovies = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the favorite movies when the component mounts
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://localhost:5000/favorites/${user.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch favorites');
                }
                const data = await response.json();
                setFavorites(data.favorites || []); // Ensure we are setting the favorites array
            } catch (error) {
                setError('Failed to load favorite movies');
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user.email]);

    // Handle delete favorite movie
    const deleteFavorite = async (movieId) => {
        console.log('Deleting favorite with Movie ID:', movieId); // Debug log
        try {
          const response = await fetch(`http://localhost:5000/favorites/${movieId}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            setFavorites(favorites.filter((fav) => fav.movie._id !== movieId));
            console.log('Favorite deleted successfully'); // Debug log
          } else {
            throw new Error('Failed to delete favorite');
          }
        } catch (error) {
          setError('Error deleting favorite movie');
          console.error('Error deleting favorite:', error);
        }
      };
      

    // Loading or error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="bg-gray-800 p-6">
            <div className="grid grid-cols-3 gap-6">
                {favorites.map((fav) => {
                    const movie = fav.movie; // Access the movie object
                    return (
                        <div key={movie._id} className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
                            <div className="flex flex-col items-center justify-center text-white">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full h-80 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                                <p className="text-lg">Genre: {movie.genre}</p>
                                <p className="text-lg">Duration: {movie.duration} mins</p>
                                <p className="text-lg">Release Year: {movie.releaseYear}</p>
                                <p className="text-lg">Rating: {movie.rating}/10</p>
                                <button
                                    className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-lg mt-4"
                                    onClick={() => deleteFavorite(movie._id)}
                                >
                                    Delete Favorite
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FavoriteMovies;

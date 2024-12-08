

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoriteMovies = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:5000/favorites/user@example.com'); // Replace with dynamic user email
                const data = await response.json();
                setFavorites(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const deleteFavorite = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/favorites/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setFavorites(favorites.filter((movie) => movie._id !== id));
            } else {
                console.error('Failed to delete favorite');
            }
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='bg-gray-800'>
              <div className="grid grid-cols-3">
            {favorites.map((movie) => (
              
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
                                    <p className="text-lg mt-4">{movie.summary}</p><br />
                                    <button className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-lg" onClick={() => deleteFavorite(movie._id)}>Delete Movie</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-end mt-5 pb-10 pr-10">
                        </div>

            
                </div>



            ))}
            </div>
        </div>
    );
};

export default FavoriteMovies;

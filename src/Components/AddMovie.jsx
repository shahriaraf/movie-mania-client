import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sppinner from './Sppinner';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    posterUrl: '',
    genre: '',
    duration: '',
    releaseYear: '',
    rating: 0, // Rating will be a number now
    summary: '',
    email: '', // Add user's email
  });

  const [errors, setErrors] = useState({
    title: '',
    posterUrl: '',
    genre: '',
    duration: '',
    releaseYear: '',
    rating: '',
    summary: '',
  });

  const [loading, setLoading] = useState(false); // Add loading state

  const genres = ['Comedy', 'Drama', 'Horror', 'Action', 'Sci-Fi', 'Romance', 'Animation', 'Thriller'];
  const years = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => 2024 - index);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (e) => {
    const value = parseFloat(e.target.value);
    setFormData({
      ...formData,
      rating: value,
    });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      title: '',
      posterUrl: '',
      genre: '',
      duration: '',
      releaseYear: '',
      rating: '',
      summary: '',
    };

    if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters long.';
      valid = false;
    }

    const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}(\/[^\s]*)?$/;
    if (!urlPattern.test(formData.posterUrl)) {
      newErrors.posterUrl = 'Please enter a valid image URL.';
      valid = false;
    }

    if (!formData.genre) {
      newErrors.genre = 'Please select a genre.';
      valid = false;
    }

    if (!formData.duration || formData.duration <= 60) {
      newErrors.duration = 'Duration must be a number greater than 60.';
      valid = false;
    }

    if (!formData.releaseYear) {
      newErrors.releaseYear = 'Please select a release year.';
      valid = false;
    }

    if (formData.rating <= 0 || formData.rating > 10) {
      newErrors.rating = 'Please select a rating between 1 and 10.';
      valid = false;
    }

    if (formData.summary.trim().length < 10) {
      newErrors.summary = 'Summary must be at least 10 characters long.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true); // Start loading state

      try {
        const response = await fetch('https://movie-mania-server-gules.vercel.app/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          ('Movie added successfully:', data);
          toast.success('Movie added successfully!');
          setFormData({
            title: '',
            posterUrl: '',
            genre: '',
            duration: '',
            releaseYear: '',
            rating: 0,
            summary: '',
            email: '',
          });
        } else {
          const errorData = await response.json();
          toast.error('Failed to add movie.');
          console.error('Error:', errorData);
        }
      } catch (error) {
        toast.error('Error submitting movie.');
        console.error('Error:', error);
      } finally {
        setLoading(false); // Stop loading state
      }
    } else {
      toast.error('Please correct the errors and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="w-full max-w-lg p-8 bg-gray-900/75 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Add a Movie</h1>

        {loading ? (
          <Sppinner /> // Show Spinner when loading
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Movie Poster URL */}
            <div>
              <label htmlFor="posterUrl" className="block text-sm font-medium">
                Movie Poster URL
              </label>
              <input
                type="text"
                id="posterUrl"
                name="posterUrl"
                placeholder="Enter movie poster URL"
                value={formData.posterUrl}
                onChange={handleChange}
                className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.posterUrl && <p className="text-red-500 text-sm">{errors.posterUrl}</p>}
            </div>

            {/* Movie Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Movie Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter movie title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Genre Dropdown */}
            <div>
              <label htmlFor="genre" className="block text-sm font-medium">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
            </div>

            {/* Duration Field */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium">
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                placeholder="Enter movie duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
            </div>

            {/* Release Year Dropdown */}
            <div>
              <label htmlFor="releaseYear" className="block text-sm font-medium">
                Release Year
              </label>
              <select
                id="releaseYear"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.releaseYear && <p className="text-red-500 text-sm">{errors.releaseYear}</p>}
            </div>

            {/* Rating Input */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                placeholder="Enter rating"
                value={formData.rating}
                onChange={handleRatingChange}
                min="1"
                max="5"
                step="0.1"
                className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
            </div>

            {/* Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-medium">
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Enter a short summary of the movie"
                className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.summary && <p className="text-red-500 text-sm">{errors.summary}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-3 rounded-lg font-semibold text-white shadow-md"
            >
              Add Movie
            </button>
          </form>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddMovie;

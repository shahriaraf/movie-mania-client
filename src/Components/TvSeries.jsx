

import React from "react";
import ReactStars from "react-rating-stars-component";

const TvSeries = () => {
  // Hardcoded sample data
  const series = [
    {
      _id: "1",
      posterUrl: "https://via.placeholder.com/150",
      title: "Breaking Bad",
      genre: "Crime, Drama",
      seasons: 5,
      releaseYear: 2008,
      summary: "A high school chemistry teacher turned methamphetamine producer.",
      rating: 4.8,
      email: "creator@amc.com",
    },
    {
      _id: "2",
      posterUrl: "https://via.placeholder.com/150",
      title: "Game of Thrones",
      genre: "Fantasy, Drama",
      seasons: 8,
      releaseYear: 2011,
      summary: "Nine noble families fight for control over the lands of Westeros.",
      rating: 4.5,
      email: "creator@hbo.com",
    },
    {
      _id: "3",
      posterUrl: "https://via.placeholder.com/150",
      title: "The Witcher",
      genre: "Fantasy, Adventure",
      seasons: 3,
      releaseYear: 2019,
      summary: "A monster hunter struggles to find his place in a world where people often prove more wicked than beasts.",
      rating: 4.3,
      email: "creator@netflix.com",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {series.map((show) => (
        <div
          key={show._id}
          className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={show.posterUrl}
            alt={show.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-white">{show.title}</h2>
            <p className="text-sm text-gray-400">{show.genre}</p>
            <p className="text-sm text-gray-400">Seasons: {show.seasons}</p>
            <p className="text-sm text-gray-400">Release Year: {show.releaseYear}</p>
            <p className="text-sm text-gray-400">{show.summary}</p>
            <div className="mt-2">
              <p className="text-sm text-gray-400">Rating: {show.rating}/5</p>
              <ReactStars
                count={5}
                value={show.rating}
                size={20}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <p className="mt-2 text-gray-400">Email: {show.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TvSeries;

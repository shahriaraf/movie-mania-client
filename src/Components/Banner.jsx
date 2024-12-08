import { useState } from "react";

const movies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
    image: "https://i.ibb.co/hRjD3K4/p15987-v-h8-au.jpg",
  },
  {
    title: "Interstellar",
    description: "A journey beyond the stars.",
    image: "https://i.ibb.co/9Y0vKtT/interstellar-2014-wallpaper-preview.jpg",
  },
  {
    title: "The Dark Knight",
    description: "A gritty, grounded superhero masterpiece.",
    image: "https://i.ibb.co/PZkPLFx/batman-the-dark-knight-rises-christopher-nolan-christian-bale-wallpaper-preview.jpg",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden shadow-lg">
      {/* Slider */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="flex-none w-full relative bg-gray-900 text-white"
            style={{ height: "90vh" }} // Default height for larger screens
          >
            {/* Movie Image */}
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover opacity-90"
            />
            {/* Movie Details */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-xl md:text-3xl font-bold">{movie.title}</h2>
              <p className="mt-2 text-sm md:text-base">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 md:p-4"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 md:p-4"
      >
        &gt;
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;

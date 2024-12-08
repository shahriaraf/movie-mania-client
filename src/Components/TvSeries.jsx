

import React from "react";
import ReactStars from "react-rating-stars-component";

const TvSeries = () => {
  // Hardcoded sample data
  const series = [
    {
      _id: "1",
      posterUrl: "https://i.ibb.co.com/3rfXjxX/MV5-BMz-U5-ZGYz-Nm-Qt-MTdh-Yy00-OGRi-LTg0-Nm-Qt-Yj-Vj-Nzli-ZTg1-ZGE4-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
      title: "Breaking Bad",
      genre: "Crime, Drama",
      seasons: 5,
      releaseYear: 2008,
      summary: "A high school chemistry teacher turned methamphetamine producer.",
      rating: 4.8,
  
    },
    {
      _id: "2",
      posterUrl: "https://i.ibb.co.com/1Rm9sR9/MV5-BMTNh-MDJm-Nm-Yt-NDQ5-OS00-ODdl-LWE0-ZDAt-ZTgy-YTIw-NDY3-OTU3-Xk-Ey-Xk-Fqc-Gc-V1.jpg",
      title: "Game of Thrones",
      genre: "Fantasy, Drama",
      seasons: 8,
      releaseYear: 2011,
      summary: "Nine noble families fight for control over the lands of Westeros.",
      rating: 4.5,
  
    },
    {
      _id: "3",
      posterUrl: "https://i.ibb.co.com/yFn24CW/images-14.jpg",
      title: "The Witcher",
      genre: "Fantasy, Adventure",
      seasons: 3,
      releaseYear: 2019,
      summary: "A monster hunter struggles to find his place in a world where people often prove more wicked than beasts.",
      rating: 4.3,
  
    },
    {
      _id: "4",
      posterUrl: "https://i.ibb.co.com/StMTjC3/MV5-BMj-E2-N2-My-Mz-Et-Nm-U5-NS00-OTI0-LTlk-NTMt-MWM1-YWYy-Nm-U4-Nm-Y0-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX10.jpg",
      title: "Stranger Things",
      genre: "Science Fiction, Horror",
      seasons: 4,
      releaseYear: 2016,
      summary: "A group of kids uncover a secret government experiment in their small town.",
      rating: 4.6,
  
    },
    {
      _id: "5",
      posterUrl: "https://i.ibb.co.com/5jfcRFT/images-15.jpg",
      title: "The Mandalorian",
      genre: "Science Fiction, Adventure",
      seasons: 2,
      releaseYear: 2019,
      summary: "A lone bounty hunter navigates the outer reaches of the galaxy.",
      rating: 4.7,
  
    },
    {
      _id: "6",
      posterUrl: "https://i.ibb.co.com/gjnHXvs/MV5-BNTQz-NGZj-NDEt-OTMw-Yi00-Mz-Fj-LWE2-ZTYt-Yz-Yx-Yz-Mw-Mj-Zk-ZDc5-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg",
      title: "Sherlock",
      genre: "Crime, Mystery",
      seasons: 4,
      releaseYear: 2010,
      summary: "A modern adaptation of Sherlock Holmes with riveting mysteries.",
      rating: 4.9,
    
    },
    {
      _id: "7",
      posterUrl: "https://i.ibb.co.com/60KFtC3/images-16.jpg",
      title: "Friends",
      genre: "Comedy, Romance",
      seasons: 10,
      releaseYear: 1994,
      summary: "Six friends navigate life and love in New York City.",
      rating: 4.5,
   
    },
    {
      _id: "8",
      posterUrl: "https://i.ibb.co.com/zS7Cbyx/images-17.jpg",
      title: "The Office",
      genre: "Comedy, Mockumentary",
      seasons: 9,
      releaseYear: 2005,
      summary: "A humorous look at the day-to-day life of office employees.",
      rating: 4.8,
   
    },
    {
      _id: "9",
      posterUrl: "https://i.ibb.co.com/zmsZh11/images-18.jpg",
      title: "The Crown",
      genre: "Drama, History",
      seasons: 6,
      releaseYear: 2016,
      summary: "A chronicle of the life of Queen Elizabeth II.",
      rating: 4.6,
     
    },
    {
      _id: "10",
      posterUrl: "https://i.ibb.co.com/d5GMNtb/images-19.jpg",
      title: "Peaky Blinders",
      genre: "Crime, Drama",
      seasons: 6,
      releaseYear: 2013,
      summary: "A gangster family epic set in early 20th century England.",
      rating: 4.7,
 
    },
    {
      _id: "11",
      posterUrl: "https://i.ibb.co.com/2v3fqNr/images-20.jpg",
      title: "Money Heist",
      genre: "Crime, Thriller",
      seasons: 5,
      releaseYear: 2017,
      summary: "A group of robbers execute meticulously planned heists.",
      rating: 4.4,

    },
    {
      _id: "12",
      posterUrl: "https://i.ibb.co.com/0qMbjSR/images-21.jpg",
      title: "Loki",
      genre: "Science Fiction, Adventure",
      seasons: 2,
      releaseYear: 2021,
      summary: "The God of Mischief embarks on an adventure through time.",
      rating: 4.6,
   
    },
  ];

  return (
    <div className="grid bg-gray-800 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {series.map((show) => (
        <div
          key={show._id}
          className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={show.posterUrl}
            alt={show.title}
            className="w-full h-80 object-cover"
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default TvSeries;

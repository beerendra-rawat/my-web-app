import { useState, useEffect } from "react";
import "../styles/Movies.css";
import cinemaPoster from "../assets/cinema.jpg";

export default function Movies() {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieType, setMovieType] = useState("popular");



  //  this function use for show populer movies
  const loadPopularMovies = async () => {
    setLoading(true)
    setError('')
    setMovieType('popular')
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=521d81bc&s=avengers`);
      let data = await response.json()

      if (data.Response === "False") {
        setError(data.Error);
        return;
      }
      setMovies(data.Search)
    }
    catch (error) {
      console.error(error)
      setError("Movie not loaded, some technical issue", error)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadPopularMovies()
  }, [])

  ///  This function use for search Movies
  const getData = async () => {
    if (!searchMovie.trim()) return;

    setLoading(true)
    setError('')
    setMovies([])
    setMovieType('Search')

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=521d81bc&s=${encodeURIComponent(searchMovie)}`);
      let data = await response.json()
      console.log(data)

      if (data.response === 'False') {
        setError(data.Error)
      }
      setMovies(data.Search)
    }
    catch (error) {
      setError("something went wrong, please try again", error)
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="movie-main-div">
        <h2 className="movie-title">Search Movies</h2>

        <div className="second-div">
          <input
            className="movie-input"
            placeholder="Search Movies..."
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getData()}
          />
          <button className="search-btn" onClick={getData}>
            Search
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {movies && (
        <>
          <h2 className="movie-title">
            {movieType === 'popular' ? "Popular Movie" : "Search Result"}
          </h2>
          <div className="movie-grid">
            {movies.map((item) => (
              <div className="movie-card" key={item.imdbID}>
                <img
                  className="movie-img"
                  src={
                    item.Poster !== "N/A" ? item.Poster : cinemaPoster
                  }
                  alt={item.Title}
                  onError={(e) => (e.target.src = cinemaPoster)}
                />
                <h3 className="movie-name">{item.Title}</h3>
                <p className="movie-year">Year: {item.Year}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

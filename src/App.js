import "./App.css";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData(currentPage - 1);
    }
  };

  const getNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchData(currentPage + 1);
    }
  };

  const fetchData = (page) => {
    setLoading(true);
    const movieApi =
      "https://api.themoviedb.org/3/search/tv?api_key=fef55a6754f2f6d00a0038388915039c&include_adult=false&query=" +
      search +
      "&page=" +
      page;
    fetch(movieApi)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
        setTotalPages(res.total_pages);
        scrollToTop();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
          setLoading(false)
      });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData(1);
  };

  return (
    <div className="App">
      <div className="header">
        <nav className="nav">
          <h2>
            <a href="https://Youssfon.github.io/TheMovieDB">
              You<span>Movie</span>
            </a>
          </h2>
          <form>
            <input
              type="text"
              className="search"
              placeholder="Enter your Keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleClick}>
              <span className="material-symbols-outlined">search</span>
            </button>
          </form>
        </nav>
      </div>
      <div className="movies">
        {loading ? (
          <div
            data-spinner=""
            className="spinner-three-bounce"
          >
            <div data-bounce1=""></div>
            <div data-bounce2=""></div>
            <div data-bounce3=""></div>
          </div>
        ) : (
          movies.map((movie, index) => {
            return (
              <div
                className="movie"
                key={index}
              >
                <img
                  className="poster"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                      : `https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg`
                  }
                  title={movie.original_name}
                  alt={movie.original_name}
                />
                <h2 className="title">{movie.original_name}</h2>
                <p
                  className="vote"
                  style={{ display: movie.vote_average === "0" && "none" }}
                >
                  <span className="material-symbols-outlined">kid_star</span>
                  {movie.vote_average.toFixed(1)}
                </p>
                <p className="date">{movie.first_air_date.slice(0,4)}</p>
              </div>
            );
          })
        )}
      </div>

      {movies.length === 0 || loading ? null : (
        <div className="pages">
          {currentPage > 1 && <button onClick={getPrevious}>Prev</button>}
          <span className="pageInfo">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && <button onClick={getNext}>Next</button>}
        </div>
      )}
    </div>
  );
}

export default App;

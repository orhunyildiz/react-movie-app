import { useEffect, useState } from "react";

const getAverage = (array) => array.reduce((sum, value) => sum + value / array.length, 0);

const api_key = "3f14d0e50817377c6d546bdc3ad30b21";

export default function App() {
    const [query, setQuery] = useState("father");
    const [movies, setMovies] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);

    function handleSelectedMovie(id) {
        setSelectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
    }

    function handleUnSelectMovie() {
        setSelectedMovie(null);
    }

    useEffect(
        function () {
            // First Render (Mount)
            async function getMovies() {
                try {
                    setLoading(true);
                    setError("");
                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
                    );
                    if (!response.ok) {
                        throw new Error("An unknown error occured!");
                    }
                    const data = await response.json();
                    if (data.total_results === 0) {
                        throw new Error("The movie not found!");
                    }
                    setMovies(data.results);
                } catch (error) {
                    setError(error.message);
                }
                setLoading(false);
            }
            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }
            getMovies();
        },
        [query]
    );
    return (
        <>
            <Nav>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NavSearchResult movies={movies} />
            </Nav>
            <Main>
                <div className="row mt-2">
                    <div className="col-md-9">
                        <ListContainer>
                            {loading && <Loading />}
                            {!loading && !error && (
                                <MovieList
                                    movies={movies}
                                    onSelectMovie={handleSelectedMovie}
                                    selectedMovie={selectedMovie}
                                />
                            )}
                            {error && <ErrorMessage message={error} />}
                        </ListContainer>
                    </div>
                    <div className="col-md-3">
                        <ListContainer>
                            <MyMovieListSummary selectedMovies={selectedMovies} />
                            <MyMovieListWrapper selectedMovies={selectedMovies} />
                            {selectedMovie && (
                                <MovieDetails selectedMovie={selectedMovie} onUnselectMovie={handleUnSelectMovie} />
                            )}
                        </ListContainer>
                    </div>
                </div>
            </Main>
        </>
    );
}

function ErrorMessage({ message }) {
    return <div className="alert alert-danger">{message}</div>;
}

function Loading() {
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

function Nav({ children }) {
    return (
        <nav className="bg-primary text-white p-2">
            <div className="container">
                <div className="row align-items-center">{children}</div>
            </div>
        </nav>
    );
}

function Logo() {
    return (
        <div className="col-4">
            <i className="bi bi-camera-reels me-2"></i>
            Movie App
        </div>
    );
}

function Search({ query, setQuery }) {
    return (
        <div className="col-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-control"
                placeholder="Search movie..."
            />
        </div>
    );
}

function NavSearchResult({ movies }) {
    return (
        <div className="col-4 text-end">
            <strong>{movies.length}</strong> records found.
        </div>
    );
}

function Main({ children }) {
    return <main className="container">{children}</main>;
}

function ListContainer({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="movie-list">
            <button className="btn btn-sm btn-outline-primary mb-2" onClick={() => setIsOpen((val) => !val)}>
                {isOpen ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
            </button>
            {isOpen && children}
        </div>
    );
}

function MovieList({ movies, onSelectMovie, selectedMovie }) {
    return (
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
            {movies.map((movie) => (
                <Movie movie={movie} key={movie.id} onSelectMovie={onSelectMovie} selectedMovie={selectedMovie} />
            ))}
        </div>
    );
}

function MovieDetails({ selectedMovie, onUnselectMovie }) {
    return (
        <div>
            <p className="alert alert-primary">{selectedMovie}</p>
            <button className="btn btn-danger" onClick={onUnselectMovie}>
                Close
            </button>
        </div>
    );
}

function Movie({ movie, onSelectMovie, selectedMovie }) {
    function formatDate(isoDateString) {
        const [year, month, day] = isoDateString.split("-");
        return `${day}-${month}-${year}`;
    }
    return (
        <div className="col mb-2">
            <div
                className={`card movie ${selectedMovie === movie.id ? "selected-movie" : ""}`}
                onClick={() => onSelectMovie(movie.id)}
            >
                <img
                    src={movie.poster_path ? "http://image.tmdb.org/t/p/w500" + movie.poster_path : "/img/no-image.jpg"}
                    alt={movie.title}
                    className="card-img-top"
                />
                <div className="card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <div>
                        <i className="bi bi-calendar2-date me-1"></i>
                        <span>{formatDate(movie.release_date)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyMovieListSummary({ selectedMovies }) {
    const avgRating = getAverage(selectedMovies.map((m) => m.Rating));
    const avgDuration = getAverage(selectedMovies.map((d) => d.Duration));
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5>My List: [{selectedMovies.length}] movies</h5>
                <div className="d-flex justify-content-between">
                    <p>
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span>{avgRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <i className="bi bi-hourglass-split me-1"></i>
                        <span>{avgDuration.toFixed(1)} min.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function MyMovieListWrapper({ selectedMovies }) {
    return selectedMovies.map((movie) => <MyMovieList movie={movie} key={movie.Id} />);
}

function MyMovieList({ movie }) {
    return (
        <div className="card mb-2">
            <div className="row">
                <div className="col-4">
                    <img src={movie.Poster} alt={movie.title} className="img-fluid rounded-start" />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>
                        <div className="d-flex justify-content-between">
                            <p>
                                <i className="bi bi-star-fill text-warning me-1"></i>
                                <span>{movie.Rating}</span>
                            </p>
                            <p>
                                <i className="bi bi-hourglass me-1"></i>
                                <span>{movie.Duration} min.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

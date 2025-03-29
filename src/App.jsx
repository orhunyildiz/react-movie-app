import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const getAverage = (array) => array.reduce((sum, value) => sum + value / array.length, 0);

const api_key = "3f14d0e50817377c6d546bdc3ad30b21";

function formatDate(isoDateString) {
    if (!isoDateString) return "";
    const [year, month, day] = isoDateString.split("-");
    return `${day}-${month}-${year}`;
}

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

    function handleAdd(movie) {
        setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
        handleUnSelectMovie();
    }

    function handleDeleteFromList(id) {
        setSelectedMovies((selectedMovies) => selectedMovies.filter((m) => m.id !== id));
    }

    useEffect(() => {
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
    }, [query]);

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
                            {selectedMovie ? (
                                <MovieDetails
                                    selectedMovie={selectedMovie}
                                    onUnselectMovie={handleUnSelectMovie}
                                    onAddToList={handleAdd}
                                    selectedMovies={selectedMovies}
                                />
                            ) : (
                                <>
                                    <MyMovieListSummary selectedMovies={selectedMovies} />
                                    <MyMovieListWrapper
                                        selectedMovies={selectedMovies}
                                        onDeleteFromList={handleDeleteFromList}
                                    />
                                </>
                            )}
                        </ListContainer>
                    </div>
                </div>
            </Main>
            <BackToTop />
        </>
    );
}

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="backToTop">
            {isVisible && (
                <button onClick={scrollToTop} className="btn btn-primary">
                    Back to Top
                </button>
            )}
        </div>
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

function MovieDetails({ selectedMovie, onUnselectMovie, onAddToList, selectedMovies }) {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const [userRating, setUserRating] = useState("");
    const isAddedToList = selectedMovies.map((m) => m.id).includes(selectedMovie);
    const selectedMoviesUserRating = selectedMovies.find((m) => m.id === selectedMovie)?.userRating;

    function handleAddToList() {
        const newMovie = {
            ...movie,
            userRating,
        };
        onAddToList(newMovie);
    }

    useEffect(() => {
        async function getMovieDetails() {
            setLoading(true);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${api_key}`);
            const data = await response.json();
            setMovie(data);
            setLoading(false);
        }
        getMovieDetails();
    }, [selectedMovie]);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="p-2 mt-3">
                    <div className="row">
                        <div className="col-4">
                            <img
                                src={
                                    movie.poster_path
                                        ? "http://image.tmdb.org/t/p/w500" + movie.poster_path
                                        : "/img/no-image.jpg"
                                }
                                alt={movie.title}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-8">
                            <h6>{movie.title}</h6>
                            <p>
                                <i className="bi bi-calendar2-date me-1"></i>
                                <span>{movie.release_date ? formatDate(movie.release_date) : ""}</span>
                            </p>
                            <p>
                                <i className="bi bi-star-fill text-warning"></i>
                                <span className="ms-1">{movie.vote_average}</span>
                            </p>
                        </div>
                        <div className="col-12 border-top p-3 mt-3">
                            <p>{movie.overview}</p>
                            <p>
                                {movie.genres?.map((genre) => (
                                    <span key={genre.id} className="badge text-bg-primary me-3">
                                        {genre.name}
                                    </span>
                                ))}
                            </p>
                            {!isAddedToList ? (
                                <>
                                    <div className="my-4">
                                        <StarRating onRating={setUserRating} maxRating={10} />
                                    </div>
                                    <button className="btn btn-primary me-1" onClick={() => handleAddToList(movie)}>
                                        Add
                                    </button>
                                </>
                            ) : (
                                <p>
                                    The movie is already in your list! Your vote:{" "}
                                    <i className="bi bi-stars text-warning"></i> {selectedMoviesUserRating}
                                </p>
                            )}
                            <button className="btn btn-danger" onClick={onUnselectMovie}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function Movie({ movie, onSelectMovie, selectedMovie }) {
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
                        <span>{movie.release_date ? formatDate(movie.release_date) : ""}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyMovieListSummary({ selectedMovies }) {
    const avgRating = getAverage(selectedMovies.map((m) => m.vote_average));
    const sumDuration = selectedMovies.reduce((total, movie) => total + movie.runtime, 0);
    const avgUserRating = getAverage(selectedMovies.map((m) => m.userRating));
    return (
        <div className="card mb-2 border-0">
            <div className="card-body">
                <h5>My List: [{selectedMovies.length}] movies</h5>
                <div className="d-flex justify-content-between">
                    <p>
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span>{avgRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <i className="bi bi-stars text-warning me-1"></i>
                        <span>{avgUserRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <i className="bi bi-hourglass-split me-1"></i>
                        <span>{sumDuration} min.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function MyMovieListWrapper({ selectedMovies, onDeleteFromList }) {
    return selectedMovies.map((movie) => (
        <MyMovieList movie={movie} key={movie.id} onDeleteFromList={onDeleteFromList} />
    ));
}

function MyMovieList({ movie, onDeleteFromList }) {
    return (
        <div className="card mb-2">
            <div className="row">
                <div className="col-4">
                    <img
                        src={
                            movie.poster_path
                                ? "http://image.tmdb.org/t/p/w500" + movie.poster_path
                                : "/img/no-image.jpg"
                        }
                        alt={movie.title}
                        className="img-fluid rounded-start"
                    />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>
                        <div className="d-flex justify-content-between">
                            <p>
                                <i className="bi bi-star-fill text-warning me-1"></i>
                                <span>{movie.vote_average}</span>
                            </p>
                            <p>
                                <i className="bi bi-hourglass me-1"></i>
                                <span>{movie.runtime} min.</span>
                            </p>
                        </div>
                        <button className="btn btn-danger" onClick={() => onDeleteFromList(movie.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

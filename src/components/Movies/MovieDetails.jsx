import { useState } from "react";
import useMovieDetails from "../../hooks/useMovieDetails";
import Loading from "../Loading";
import StarRating from "../../StarRating";
import FormatDate from "../FormatDate";

export default function MovieDetails({ selectedMovie, onUnselectMovie, onAddToList, selectedMovies }) {
    const [userRating, setUserRating] = useState("");
    const isAddedToList = selectedMovies.map((m) => m.id).includes(selectedMovie);
    const selectedMoviesUserRating = selectedMovies.find((m) => m.id === selectedMovie)?.userRating;

    const { movie, loading } = useMovieDetails(selectedMovie);

    function handleAddToList() {
        const newMovie = {
            ...movie,
            userRating,
        };
        onAddToList(newMovie);
    }
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
                                <span>{movie.release_date ? FormatDate(movie.release_date) : ""}</span>
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

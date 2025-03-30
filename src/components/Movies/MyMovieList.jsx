export default function MyMovieList({ movie, onDeleteFromList }) {
    return (
        <div className="card mb-2">
            <div className="row">
                <div className="col-3">
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
                <div className="col-9">
                    <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>
                        <div className="d-flex justify-content-between">
                            <p>
                                <i
                                    title="Average TMDB Rating of This Movie"
                                    className="bi bi-star-fill text-warning me-1"
                                ></i>
                                <span title="Average TMDB Rating of This Movie">
                                    {Number(movie.vote_average).toFixed(2)}
                                </span>
                            </p>
                            <p>
                                <i title="Your Rating" className="bi bi-stars text-warning me-1"></i>
                                <span title="Your Rating">{movie.userRating ? movie.userRating : "-"}</span>
                            </p>
                            <p>
                                <i title="Duration" className="bi bi-hourglass me-1"></i>
                                <span title="Duration">{movie.runtime} min.</span>
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

export default function MyMovieList({ movie, onDeleteFromList }) {
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

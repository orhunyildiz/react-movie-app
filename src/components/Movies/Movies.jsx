import FormatDate from "../FormatDate";

export default function Movie({ movie, onSelectMovie, selectedMovie }) {
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
                        <span>{movie.release_date ? FormatDate(movie.release_date) : ""}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

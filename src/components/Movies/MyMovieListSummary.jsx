export default function MyMovieListSummary({ selectedMovies }) {
    const getAverage = (array) => array.reduce((sum, value) => sum + value / array.length, 0);
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

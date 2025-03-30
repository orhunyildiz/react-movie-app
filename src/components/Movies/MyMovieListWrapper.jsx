import MyMovieList from "./MyMovieList";

export default function MyMovieListWrapper({ selectedMovies, onDeleteFromList }) {
    return selectedMovies.map((movie) => (
        <MyMovieList movie={movie} key={movie.id} onDeleteFromList={onDeleteFromList} />
    ));
}

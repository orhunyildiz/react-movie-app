import { useState } from "react";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import BackToTop from "./components/BackToTop";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Nav from "./components/Navbar/Nav";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NavSearchResult from "./components/Navbar/NavSearchResult";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieDetails from "./components/Movies/MovieDetails";
import MyMovieListSummary from "./components/Movies/MyMovieListSummary";
import MyMovieListWrapper from "./components/Movies/MyMovieListWrapper";
import MovieList from "./components/Movies/MovieList";

export default function App() {
    const [query, setQuery] = useState("");
    const [selectedMovies, setSelectedMovies] = useLocalStorage([], "selectedMovies");
    const [selectedMovie, setSelectedMovie] = useState(null);

    const { movies, loading, error, currentPage, totalPages, totalResults, nextPage, previousPage, setCurrentPage } =
        useMovies(query);

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

    return (
        <>
            <Nav>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NavSearchResult totalResults={totalResults} />
            </Nav>
            <Main>
                <div className="row mt-2">
                    <div className="col-md-9">
                        <ListContainer>
                            {loading && <Loading />}
                            {!loading && !error && (
                                <>
                                    {movies.length > 0 && (
                                        <>
                                            <MovieList
                                                movies={movies}
                                                onSelectMovie={handleSelectedMovie}
                                                selectedMovie={selectedMovie}
                                            />
                                            <Pagination
                                                nextPage={nextPage}
                                                previousPage={previousPage}
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={(page) => setCurrentPage(page)}
                                            />
                                        </>
                                    )}
                                </>
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

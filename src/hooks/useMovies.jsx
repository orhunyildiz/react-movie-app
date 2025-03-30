import { useEffect, useState } from "react";

const api_key = "3f14d0e50817377c6d546bdc3ad30b21";

export default function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    function nextPage() {
        setCurrentPage(currentPage + 1);
    }

    function previousPage() {
        setCurrentPage(currentPage - 1);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function getMovies(page) {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}`,
                    { signal: signal }
                );
                if (!response.ok) {
                    throw new Error("An unknown error occured!");
                }
                const data = await response.json();
                if (data.total_results === 0) {
                    throw new Error("The movie not found!");
                }
                setMovies(data.results);
                setTotalPages(data.total_pages);
                setTotalResults(data.total_results);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("aborted...");
                } else {
                    setError(error.message);
                }
            }
            setLoading(false);
        }
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        getMovies(currentPage);
        return () => {
            controller.abort();
        };
    }, [query, currentPage]);

    return { movies, loading, error, currentPage, totalPages, totalResults, nextPage, previousPage, setCurrentPage };
}

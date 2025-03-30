import { useEffect, useState } from "react";

const api_key = "3f14d0e50817377c6d546bdc3ad30b21";

export default function useMovieDetails(id) {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getMovieDetails() {
            setLoading(true);
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
            const data = await response.json();
            setMovie(data);
            setLoading(false);
        }
        getMovieDetails();
    }, [id]);
    return { movie, loading };
}

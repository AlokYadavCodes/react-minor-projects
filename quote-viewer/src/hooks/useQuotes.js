import { useEffect, useState } from "react"
import { getQuotes } from "../services/quoteService";

function useQuotes({ page, limit = 10 }) {

    const [allQuotes, setAllQuotes] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const firstIndexOfPage = (page - 1) * limit;
        if (allQuotes[firstIndexOfPage]) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);

        getQuotes({ page, limit, signal: controller.signal })
            .then((data) => {
                setAllQuotes((prevQuotes) => [...prevQuotes, ...data.quotes]);
                setTotalPages(data.totalPages);
            })
            .catch((err) => {
                if (err.name !== "AbortError") setError(err);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => controller.abort();
    }, [page]);

    const quotes = allQuotes.slice((page - 1) * limit, page * limit);

    return { quotes, totalPages, loading, error }
}

export { useQuotes };
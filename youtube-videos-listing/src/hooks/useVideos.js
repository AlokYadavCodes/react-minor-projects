import { useEffect, useState } from "react";
import { getVideos } from "../services/videoService";

function useVideos({ page, limit = 10 }) {
    const [allVideos, setAllVideos] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const firstIndexOfPage = (page - 1) * limit;
        if (allVideos[firstIndexOfPage]) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);

        getVideos({ page, limit, signal: controller.signal })
            .then((data) => {
                setAllVideos((prev) => [...prev, ...data.videos]);
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

    const videos = allVideos.slice((page - 1) * limit, page * limit);

    return { videos, totalPages, loading, error };
}

export { useVideos };

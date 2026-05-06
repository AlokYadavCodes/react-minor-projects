import { useEffect, useState } from "react";
import { getMeals } from "../services/mealService";

function useMeals({ page, limit = 10 }) {
    const [allMeals, setAllMeals] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const firstIndexOfPage = (page - 1) * limit;
        if (allMeals[firstIndexOfPage]) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);

        getMeals({ page, limit, signal: controller.signal })
            .then((data) => {
                setAllMeals((prev) => [...prev, ...data.meals]);
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

    const meals = allMeals.slice((page - 1) * limit, page * limit);

    return { meals, totalPages, loading, error };
}

export { useMeals };

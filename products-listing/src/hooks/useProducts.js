import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function useProducts({ page, limit = 10 }) {
    const [allProducts, setAllProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const firstIndexOfPage = (page - 1) * limit;
        if (allProducts[firstIndexOfPage]) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);

        getProducts({ page, limit, signal: controller.signal })
            .then((data) => {
                setAllProducts((prev) => [...prev, ...data.products]);
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

    const products = allProducts.slice((page - 1) * limit, page * limit);

    return { products, totalPages, loading, error };
}

export { useProducts };

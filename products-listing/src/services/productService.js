async function getProducts({ page, limit = 10, signal }) {
    const response = await fetch(
        `https://api.freeapi.app/api/v1/public/randomproducts?page=${page}&limit=${limit}`,
        { signal }
    );
    const data = await response.json();
    return { products: data.data.data, totalPages: data.data.totalPages };
}

export { getProducts };

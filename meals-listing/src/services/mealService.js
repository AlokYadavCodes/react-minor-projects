async function getMeals({ page, limit = 10, signal }) {
    const response = await fetch(
        `https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=${limit}`,
        { signal }
    );
    const data = await response.json();
    return { meals: data.data.data, totalPages: data.data.totalPages };
}

export { getMeals };

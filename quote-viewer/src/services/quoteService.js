async function getQuotes({page, limit = 10, signal}){
    const response = await fetch(`https://api.freeapi.app/api/v1/public/quotes?page=${page}&limit=${limit}`, { signal })
    const data = await response.json();
    const quotes = data.data.data;
    return {quotes, totalPages: data.data.totalPages};
}

export { getQuotes }
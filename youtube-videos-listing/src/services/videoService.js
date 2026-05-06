async function getVideos({ page, limit = 10, signal }) {
    const response = await fetch(
        `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=${limit}`,
        { signal }
    );
    const data = await response.json();
    return { videos: data.data.data, totalPages: data.data.totalPages };
}

export { getVideos };

const page = Math.floor(Math.random() * 5 + 1);

export const genres = `genre/movie/list?language=en`
export const movieUpcoming = `movie/upcoming?language=en-US&page=${page}`
export const moviePopular = `movie/popular?language=en-US&page=${page}`
export const TopRated = `movie/top_rated?language=en-US&page=${page}`;
export const originals = `discover/tv?with_networks=213&sort_by=popularity.desc&language=en-US&page=${page}`;
export const action = `discover/movie?with_genres=28&page=${page}`;
export const comedy = `discover/movie?with_genres=35&page=${page}`;
export const horror = `discover/movie?with_genres=27&page=${page}`;
export const kids = `discover/movie?with_genres=10751&page=${page}`;
export const family = `discover/tv?with_genres=10751&page=${page}`;
export const Adventure = `discover/movie?with_genres=12&page=${page}`;
export const SciFi = `discover/movie?with_genres=878&page=${page}`;
export const Animated = `discover/movie?with_genres=16&page=${page}`;
export const War = `discover/movie?with_genres=10752&page=${page}`;
export const trending = `trending/all/week?sort_by=popularity.desc&language=en-US&page=${page}`;
export const trendingSeries = `trending/tv/week?sort_by=popularity.desc&language=en-US&page=${page}`;
export const UpcomingMovies = `movie/upcoming?language=en-US&page=${page}`;
export const myList = `account/21512029/watchlist/movies?language=en-US&page=2&sort_by=created_at.asc&page=1`
export const tvPopular = `tv/popular?language=en-US&page=${page}`
export const tvAir = `tv/on_the_air?language=en-US&page=${page}`
export const tvTopRated = `tv/top_rated?language=en-US&page=${page}`
export const latest = `movie/latest?page=${page} `
export const similarMovies = (movieId) => `movie/${movieId}/similar?language=en-US&page=${page}`;
export const tvShowsGenres = (genreId) => `discover/tv?with_genres=${genreId}`
export const moviesWithGenres = (movieId) => `discover/movie?with_genres=${movieId}`
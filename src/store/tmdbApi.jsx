import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTI5ZTBiNWVlNzhmODRkMTMxYmY5MTY3MTk5NzVjOCIsIm5iZiI6MTcyNTk4MjQ5OS4xNDExODgsInN1YiI6IjY2ZTA2NjU0MDAwMDAwMDAwMDY0MGZiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1Ylfj0B85mh9IS1ZiAlpLD4hGuaMECioH5Es1pKXoM';
const page = Math.floor(Math.random() * 5 + 1);


export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3',
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${API_KEY}`);
            headers.set('accept', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchMovies: builder.query({
            query: ({ query, includeAdult = false, language = 'en-US' }) =>
                `/search/movie?query=${encodeURIComponent(query)}&include_adult=${includeAdult}&language=${language}&page=1`,
        }),
        moviesVideo: builder.query({
            query: (id) =>
                `/movie/${id}/videos?language=en-US`,
        }),
        getData: builder.query({
            query: ({ endpoint }) => `${endpoint}`
        }),
        addWatch: builder.mutation({
            query: ({ media_type, media_id, watchlist }) => ({
                url: `/account/21512029/watchlist`,
                method: 'POST',
                body: {
                    media_type,
                    media_id,
                    watchlist,
                }
            })    
        }), 
    }),
});

export const { useGetFavoriteMoviesQuery,
    useSearchMoviesQuery,
    useMoviesVideoQuery,
    useGetDataQuery,
    useAddWatchMutation,

} = tmdbApi;
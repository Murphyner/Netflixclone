import { useGetDataQuery } from "./tmdbApi";
import { genres } from "./URL";

const useGenereConverter = () => {
    const { data: genresList } = useGetDataQuery({endpoint: genres})
    const convertGenere = (genreIds) => {
        const genresConvertedList = [];
        genreIds
            .slice(0, 3)
            .map((genreId) =>
                genresList?.genres
                    .filter((el) => el.id === genreId)
                    .map((el) => genresConvertedList.push(el.name))
            );

        return genresConvertedList;
    };

    return { convertGenere };
};

export default useGenereConverter;

import React, { useContext, useEffect } from 'react';
import { useSearchMoviesQuery } from '../store/tmdbApi';
import RowTwo from '../components/RowTwo';
import { PopUpContext } from '../Context/PopUpContext';

function Search() {
    const { query } = useContext(PopUpContext);
    const { data, refetch } = useSearchMoviesQuery({ query });

    useEffect(() => {
        refetch();
    }, [query, refetch]);

    return (
        <div className={`bg-bg-custom ${data ? 'h-auto' : 'min-h-screen'}`}>
            {data && data.results?.length > 0 && (
                <RowTwo data={data} title={'More To Explore'} refetch={refetch} />
            )}
        </div>
    );
}

export default Search;

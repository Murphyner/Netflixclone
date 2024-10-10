import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import StarRatings from 'react-star-ratings';
import MoviePopUp from './MoviePopUp';
import useGenereConverter from '../store/useGenereConverter';
import { useAddWatchMutation, useGetDataQuery } from '../store/tmdbApi';
import { PopUpContext } from '../Context/PopUpContext';
import { myList } from '../store/URL';
import toast, { Toaster } from 'react-hot-toast';

function MobileRow({ data, refetch , title}) {
    const [addWatch] = useAddWatchMutation();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { showModal, setShowModal } = useContext(PopUpContext);
    const { convertGenere } = useGenereConverter();
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    const handleResize = () => {
        setIsMobileView(window.innerWidth < 768);
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const handleCardClick = (item) => {
        if (isMobileView) {
            setSelectedMovie(item);
            setShowModal(true);
        }
    };

    const addList = (item) => {
        addWatch({
            media_type: "movie",
            media_id: item.id,
            watchlist: true
        }).then(() => {
            toast.success(`${item.title || item.name} added to MyList`, {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#111111',
                    color: '#fff',
                },
            });
            refetch();
        });
    };
    const removeList = (item) => {
        addWatch({
            media_type: "movie",
            media_id: item.id,
            watchlist: false
        }).then(() => {
            toast.error(`${item.title || item.name} removed from MyList`, {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#111111',
                    color: '#fff',
                },
            });
            refetch();
        });
    };

    return (
        <>
            <Toaster />
            <div className='min-h-screen bg-bg-custom'>
                <div className='w-[93%] mx-auto p-2'>
                    <div className='relative -top-14 w-full mx-auto'>
                      <h1 className='text-white font-semibold text-xl'>Your Search</h1> 
                        <div>
                            <TransitionGroup className='grid w-full pt-5 mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-10 grid-flow-row overflow-y-scroll no-scrollbar'>
                                {data?.results.map((item) => (
                                    <CSSTransition
                                        key={item.id}
                                        timeout={500}
                                        classNames='fade'
                                    >
                                        <div
                                            onClick={() => handleCardClick(item)}
                                            className='relative rounded-md group group1 bg-transparent transition-all  duration-500 cursor-pointer card'
                                        >
                                            <img
                                                className='sm:h-36 w-full rounded-md'
                                                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                                                alt={item.title || item.name}
                                            />
                                            <div className="absolute inset-0 bg-black rounded-md bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </div>

                        {showModal && <MoviePopUp selectedMovie={selectedMovie} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MobileRow;

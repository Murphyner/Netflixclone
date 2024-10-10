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

                                            <div className='content h-full lg:group-hover:block '>
                                                <div className="opacity-0 pt-3 lg:hover:opacity-100 transition-all duration-1000 lg:hover:translate-y-0 translate-y-5 ease-in-out overflow-hidden">
                                                    <div className='flex transition bg-transparent ml-3 ease-in-out delay-150'>
                                                        <div className='text-white w-8 h-8 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white bg-black bg-opacity-50'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                strokeWidth={1.5}
                                                                stroke='currentColor'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='M5.25 5.653l11.54 6.348a1.125 1.125 0 010 1.971L5.25 20.32a1.125 1.125 0 01-1.667-.985V6.638a1.125 1.125 0 011.667-.985z'
                                                                />
                                                            </svg>
                                                        </div>

                                                        {title ? (<div
                                                            onClick={() => addList(item)}
                                                            className="group text-white w-8 h-8 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] hover:bg-white hover:text-black shadow-md cursor-pointer ease-linear transition-all duration-150"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 4.5v15m7.5-7.5h-15"
                                                                />
                                                            </svg>
                                                        </div>) : (
                                                            <div
                                                                onClick={() => removeList(item)}
                                                                className="text-white w-8 h-8 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white bg-black bg-opacity-50"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={1.5}
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M19.5 12h-15"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        )}

                                                        <div onClick={() => {
                                                            setShowModal(true);
                                                            setSelectedMovie(item);
                                                        }} className='text-white w-8 h-8 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white bg-black bg-opacity-50'>
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                strokeWidth={1.5}
                                                                stroke='currentColor'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <h1 className='text-white ml-4 font-medium w-4/5 xl:line-clamp-1'>
                                                        {item?.name || item?.title}
                                                    </h1>
                                                    <h1 className='text-white text-xs font-semibold ml-4 w-11/12'>
                                                        {item?.release_date || item?.first_air_date}
                                                    </h1>
                                                    <div className='ml-4'>
                                                        <StarRatings
                                                            rating={item?.vote_average / 2}
                                                            starRatedColor='red'
                                                            numberOfStars={5}
                                                            name='rating'
                                                            starDimension='0.8rem'
                                                            starSpacing='0.2rem'
                                                        />
                                                    </div>
                                                    <h1 className='flex text-neutral-400 text-sm ml-4 leading-relaxed'>
                                                        Genre:
                                                        {convertGenere(item.genre_ids)
                                                            .slice(0, 2)
                                                            .map((genere) => (
                                                                <span
                                                                    key={genere}
                                                                    className='text-white ml-2 font-medium'
                                                                >
                                                                    {genere}
                                                                </span>
                                                            ))}
                                                    </h1>
                                                </div>
                                            </div>
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

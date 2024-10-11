import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarRatings from "react-star-ratings";
import { motion } from "framer-motion"; // Import framer-motion
import { useAddWatchMutation, useGetDataQuery } from "../store/tmdbApi";
import MoviePopUp from "./MoviePopUp";
import { useContext, useEffect, useState } from "react";
import { PopUpContext } from "../Context/PopUpContext";
import useGenereConverter from "../store/useGenereConverter";
import { myList } from "../store/URL";
import toast, { Toaster } from "react-hot-toast";
import SkeletonCard from './SkeletonCard'; // Import the SkeletonCard
import { Link } from "react-router-dom";

function Row(props) {
    const { data, isLoading } = useGetDataQuery({ endpoint: props.url });
    const { showModal, setShowModal } = useContext(PopUpContext);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { convertGenere } = useGenereConverter();
    const [addWatch] = useAddWatchMutation();
    const { data: List, refetch } = useGetDataQuery({ endpoint: myList });
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const [applyPadding, setApplyPadding] = useState(true);

    const handleResize = () => {
        setIsMobileView(window.innerWidth < 768);
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
        });
    };

    const isInWatchlist = (movieId) => {
        if (!List || !List.results) return false;
        return List.results.some((movie) => movie.id === movieId);
    };
    const handleCardClick = (item) => {
        if (isMobileView) {
            setSelectedMovie(item);
            setShowModal(true);
        }
    };

    const customSettings = {
        breakpoints: {
            1800: { slidesPerView: 6.1, slidesPerGroup: 5 },
            1690: { slidesPerView: 5.5, slidesPerGroup: 5 },
            1536: { slidesPerView: 5, slidesPerGroup: 5 },
            1280: { slidesPerView: 5.2, slidesPerGroup: 4 },
            768: { slidesPerView: 3.3, slidesPerGroup: 3 },
            625: { slidesPerView: 3.1, slidesPerGroup: 3 },
            330: { slidesPerView: 2.1, slidesPerGroup: 2 },
            0: { slidesPerView: 1, slidesPerGroup: 2 },
        },
        onSlideChange: (swiper) => {
            if (swiper.activeIndex === 0) {
                setApplyPadding(true);  // Apply padding at the start
            } else {
                setApplyPadding(false); // Remove padding when not at the start
            }
        }
    };

    return (
        <>
            <Toaster />
            <h1 className="text-white pl-5 sm:pl-8 md:pl-10 lg:pl-14 group transition-all duration-500 hover:text-cyan-700 cursor-pointer xl:pb-0 font-semibold text-base md:text-xl">
                {props.title}
            </h1>

            <div className={`transition-all duration-1000 ease-in-out ${applyPadding ? 'pl-5 sm:pl-8 md:pl-10 lg:pl-14' : 'pl-0'}`}>
                <Swiper
                    {...customSettings}
                    modules={[Navigation, Pagination]}
                    spaceBetween={8}
                    slidesPerView={5.2}
                    navigation
                    pagination={{ clickable: true }}
                    className="SwiperStyle"
                >
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, i) => (
                            <SwiperSlide key={i}>
                                <SkeletonCard />
                            </SwiperSlide>
                        ))
                    ) : (
                        data?.results.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div onClick={() => handleCardClick(item)} className="relative group"> {/* Added group class for hover effect */}
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                                        alt={item?.name || item?.title}
                                        className="cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> {/* Overlay */}

                                    <div className="content pt-16 opacity-0  md:opacity-100">
                                        <div className="opacity-0 pt-3 hover:opacity-100 transition-all  duration-700 hover:translate-y-0 translate-y-3 ease-in-out">
                                            <div className="flex transition ml-3 ease-in-out delay-150">
                                                <Link to={`play/${item.id}`}
                                                    className="text-white w-8 h-8 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653l11.54 6.348a1.125 1.125 0 010 1.971L5.25 20.32a1.125 1.125 0 01-1.667-.985V6.638a1.125 1.125 0 011.667-.985z" />
                                                    </svg>
                                                </Link>

                                                {/* Add to Favorites */}
                                                {isInWatchlist(item.id) ? (
                                                    <div
                                                        onClick={() => removeList(item)}
                                                        className="text-white w-8 h-8 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
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
                                                ) : (
                                                    <div
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
                                                    </div>
                                                )}
                                                <div
                                                    className="text-white w-8 h-8 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
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
                                                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25"
                                                        />
                                                    </svg>
                                                </div>

                                                {/* Show More Info */}
                                                <div
                                                    onClick={() => {
                                                        setSelectedMovie(item); // Set the selected movie
                                                        setShowModal(true); // Open the modal
                                                    }}
                                                    className="text-white w-8 h-8 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:text-black hover:bg-white"
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
                                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            <h1 className="text-white ml-4 font-medium w-4/5 xl:line-clamp-1">
                                                {item?.name || item?.title}
                                            </h1>
                                            <h1 className="text-white text-xs font-semibold ml-4 w-11/12">
                                                {item?.release_date || item?.first_air_date}
                                            </h1>
                                            <div className="ml-4">
                                                <StarRatings
                                                    rating={item?.vote_average / 2}
                                                    starRatedColor="red"
                                                    numberOfStars={5}
                                                    name="rating"
                                                    starDimension="0.8rem"
                                                    starSpacing="0.2rem"
                                                />
                                            </div>
                                            <h1 className="flex text-neutral-400 text-sm ml-4 leading-relaxed">
                                                Genre:
                                                {convertGenere(item.genre_ids).slice(0, 2).map(
                                                    (genere) => {
                                                        return (
                                                            <span className="text-white ml-2 font-medium" key={genere}>
                                                                {genere}
                                                            </span>
                                                        );
                                                    }
                                                )}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>

                {showModal && selectedMovie && (
                    <MoviePopUp selectedMovie={selectedMovie} showModal={showModal} setShowModal={setShowModal} />
                )}
            </div>
        </>
    );
}

export default Row;

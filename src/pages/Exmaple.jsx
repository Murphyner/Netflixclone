import React, { useRef, useState, useEffect } from 'react';
import { useGetPopularQuery } from '../store/tmdbApi';

function Example() {
    const { data: popular } = useGetPopularQuery();
    const sliderRef = useRef(null);
    const [progress, setProgress] = useState(1);
    const [totalPages, setTotalPages] = useState(8);
    const [modal, setModal] = useState(false)
    const [itemId, setItemId] = useState(null)

    console.log(popular);


    const slideLeft = () => {
        sliderRef.current.scrollLeft -= 500;
    };

    const slideRight = () => {
        sliderRef.current.scrollLeft += 500;
    };

    const calculateProgress = () => {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const pages = Math.ceil(scrollWidth / clientWidth) + 4;
        setTotalPages(pages);
        setProgress(Math.ceil(scrollLeft / 500) + 1);



    };
    const handleMouseEnter = (e, item) => {
        const target = e.target.getBoundingClientRect()
        setItemId(item?.id)
        setTimeout(() => setModal(true), 0)

    }
    console.log(itemId);




    useEffect(() => {
        const slider = sliderRef.current;
        slider.addEventListener('scroll', calculateProgress);

        return () => slider.removeEventListener('scroll', calculateProgress);
    }, []);

    return (
        <main className='bg-gradient-to-b from-black/95  left-0 right-0 top-[80%] to-black min-h-screen' >
            <div className="relative w-[96%] float-right">
                <h2 className="text-2xl font-bold text-white mb-4 absolute -z-0">Popular Movies</h2>
                <div className="relative top-10 ">
                    <button
                        onClick={slideLeft}
                        className="absolute text-[100px] flex items-center h-[130px] opacity-0 hover:opacity-100 transition-all duration-300 left-0 top-0 bottom-0 z-20 cursor-pointer bg-black bg-opacity-50 text-white px-4 py-2"
                    >
                        ‹
                    </button>

                    <div className="absolute right-4 -top-4 gap-[2px] flex ">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <div
                                key={index}
                                className="w-3 h-[2px] bg-gray-500 relative">
                                {index < progress && (
                                    <div className="w-full h-full bg-red-500"></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div
                        ref={sliderRef}
                        className="flex items-center overflow-x-scroll no-scrollbar scrollbar-hide scroll-smooth space-x-3"
                    >
                        {popular?.results?.map((item, i) => (
                            <div
                                onMouseEnter={(e) => handleMouseEnter(e, item)}
                                onMouseLeave={() => setModal(null)}
                                key={i} className={` transition-all swiper-slide absolute bg-white  duration-1000  cursor-pointer min-w-[230px] h-[130px]`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                                    alt={item.title}
                                    className="w-full h-[130px] object-cover rounded-sm   transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={slideRight}
                        className="absolute h-[130px] top-0 text-[100px] flex items-center right-0  duration-300 opacity-0 transition-all hover:opacity-100 bottom-0 z-10 bg-black bg-opacity-50 text-white px-4 py-2"
                    >
                        ›
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Example;

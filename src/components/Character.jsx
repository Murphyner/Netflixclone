import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../components/RowStyle.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";


function Character() {
    const [applyPadding, setApplyPadding] = useState(true);

    const customSettings = {
        breakpoints: {
            // For extra-large screens
            1800: { slidesPerView: 9.7, slidesPerGroup: 5, spaceBetween: 8 },
            // For large screens
            1600: { slidesPerView: 9, slidesPerGroup: 5, spaceBetween: 8 },
            1280: { slidesPerView: 6.7, slidesPerGroup: 4, spaceBetween: 6 },
            // For medium screens like tablets
            1024: { slidesPerView: 6, slidesPerGroup: 3, spaceBetween: 4 },
            768: { slidesPerView: 4, slidesPerGroup: 3, spaceBetween: 4 },
            // For smaller screens like mobile phones
            600: { slidesPerView: 3.7, slidesPerGroup: 3, spaceBetween: 4 },
            420: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 3 },
            330: { slidesPerView: 2.7, slidesPerGroup: 2, spaceBetween: 2 },
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
      <div className={`transition-all duration-500 ease-in-out ${applyPadding ? 'pl-5 sm:pl-8 md:pl-10 lg:pl-14' : 'pl-0'}`}>
      <Swiper 
            {...customSettings}
            modules={[Navigation, Pagination]}
            spaceBetween={8}
            slidesPerView={6.6}
            navigation
            pagination={{ clickable: true }}
            className="SwiperStyle" 
        >
                {Array.from({length : 24 }).map((_ ,i) => (
                    <SwiperSlide >
                        <div
                            className="w-32 h-32 md:h-48 md:w-48  bg-red-500 rounded-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url('/assets/images/Character${i + 1}.webp')`,
                            }}
                        >
                        </div>
                    </SwiperSlide>
                ))}
      </Swiper>
    </div>
  )
}

export default Character

import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import PopUpProvider from '../Context/PopUpContext'
import Row from '../components/Row'
import { tvAir, tvPopular, tvShowsGenres, tvTopRated } from '../store/URL'
import { useLocation } from 'react-router-dom'

function TvShows() {
    const [show , setShow] = useState(true)
    const location = useLocation()
    const genreId = location.pathname.slice(1)
    const tvShowsEndpoint = tvShowsGenres(genreId); 
    useEffect(() => {
        location.pathname !== '/tvshows' ? setShow(false) : setShow(true)
    } , [location])
    
  return (
    <div>
        {show ? (
        <PopUpProvider >
            <Banner />
        </PopUpProvider>
        ) : '' }
       

        <div className={` bg-bg-custom ${show ? '' : 'h-[1000px]'}`}>
            <div className={`relative  ${show ? '-top-20' : 'top-32'}`}>
                {show ? '' : (
                    <PopUpProvider>
                        <Row url={tvShowsEndpoint} title={'Your Search'} />
                    </PopUpProvider>
                )}
                <PopUpProvider>
                    <Row url={tvPopular} title={"Popular TV Shows"}  />
                </PopUpProvider>
                <PopUpProvider>
                    <Row url={tvAir} title={"TV Shows On The Air"} />
                </PopUpProvider>
                <PopUpProvider>
                    <Row url={tvTopRated} title={"Top Rated TV Shows"} />
                </PopUpProvider>
            </div>
        </div>
    </div>
  )
}

export default TvShows

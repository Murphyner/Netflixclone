import React, { useEffect, useState } from 'react'
import PopUpProvider from '../Context/PopUpContext'
import RowTwo from '../components/RowTwo'
import { useLocation } from 'react-router-dom'
import { action, horror, moviePopular, moviesWithGenres, TopRated } from '../store/URL'
import { useGetDataQuery } from '../store/tmdbApi'
import Banner from '../components/Banner'
import Row from '../components/Row'

function Movies() {
    const [show, setShow] = useState(true)
    const location = useLocation()
    const movieId = location.pathname.slice(8)
    const movies = moviesWithGenres(movieId)
    useEffect(() => {
        location.pathname !== '/movies' ? setShow(false) : setShow(true)

    } , [location])
  return (
    <div>
        {show ? (
            <PopUpProvider >
                <Banner />
            </PopUpProvider>
        ) : ''}
          <div className={` bg-bg-custom ${show ? '' : 'h-[1000px]'}`}>
              <div className={`relative  ${show ? '-top-20' : 'top-32'}`}>
                  {show ? '' : (
                      <PopUpProvider>
                          <Row url={movies} title={'Your Search'} />
                      </PopUpProvider>
                  )}
                  <PopUpProvider>
                      <Row url={moviePopular} title={"Popular Movies"} />
                  </PopUpProvider>
                  <PopUpProvider>
                      <Row url={action} title={"Action"} />
                  </PopUpProvider>
                  <PopUpProvider>
                      <Row url={horror} title={"Horror"} />
                  </PopUpProvider>
                  <PopUpProvider>
                      <Row url={TopRated} title={"Horror"} />
                  </PopUpProvider>
              </div>
          </div>
    </div>
  )
}

export default Movies

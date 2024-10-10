import React from 'react'
import PopUpProvider from '../Context/PopUpContext'
import Banner from '../components/Banner'
import { useLocation } from 'react-router-dom'
import { useGetDataQuery } from '../store/tmdbApi'
import { moviesWithGenres } from '../store/URL'
import MobileRow from '../components/MobileRow'

function Mobile() {
    const location = useLocation()
    const genreId = location.pathname.slice(8)
    const movies = moviesWithGenres(genreId)
    const {data , refetch} = useGetDataQuery({endpoint : movies })    
  return (
    <div>
        <PopUpProvider>
            <Banner />
        </PopUpProvider>
        <div className='bg-bg-custom min-h-screen'>
            <div className='relative '>
                <PopUpProvider>
                    <MobileRow data={data} refetch={refetch} title={'Your Search'} />
                </PopUpProvider>
            </div>

        </div>
    </div>
  )
}

export default Mobile

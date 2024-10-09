import React from 'react'
import { useGetDataQuery } from '../store/tmdbApi'
import { UpcomingMovies } from '../store/URL'

function Notfications() {
    const {data} = useGetDataQuery({endpoint: UpcomingMovies})
    console.log('not' , data);
    

  return (
      <div className="absolute w-[500px] flex-col h-[400px] top-11 overflow-y-scroll right-0 border-[1px] border-white flex gap-2 bg-black bg-opacity-85 p-4">
        <h2 className='text-xl font-semibold '>Soon On Netflix</h2>
          {data?.results?.map((item , i) => (
            <div className='flex gap-2 items-center'>
                <img 
                    className='h-20'
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                />
                <div className='flex flex-col gap-2 '>
                    <h2 className='text-sm font-bold'>{item.title || item.name}</h2>
                    <p className='line-clamp-3 text-sm opacity-70'>{item.overview}</p>
                </div>
            </div>
          ))}
      </div>
  )
}

export default Notfications

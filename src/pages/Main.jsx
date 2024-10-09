import React from 'react';
import Row from '../components/Row';
import Banner from '../components/Banner';
import { action, Adventure, Animated, comedy, horror, originals, SciFi, TopRated, trending, trendingSeries, UpcomingMovies, War } from '../store/URL';
import PopUpProvider from '../Context/PopUpContext';

function Main() {
  return (
    <main>
      {/* Wrap Banner with its own PopUpProvider */}
      <PopUpProvider>
        <Banner />
      </PopUpProvider>

      <div className=' bg-bg-custom '>
        <div className='relative -top-20'>
          {/* Wrap each Row with its own PopUpProvider */}
          <PopUpProvider>
            <Row title='Popular' url={TopRated} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Trending' url={trending} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Trending Series' url={trendingSeries} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Upcoming' url={UpcomingMovies} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Action' url={action} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Animated' url={Animated} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Comedy' url={comedy} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Netflix Originals' url={originals} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Horror' url={horror} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='Adventure' url={Adventure} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='SciFi' url={SciFi} />
          </PopUpProvider>

          <PopUpProvider>
            <Row title='War' url={War} />
          </PopUpProvider>
        </div>
      </div>
    </main>
  );
}

export default Main;

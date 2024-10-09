import React, { useState } from 'react'
import PopUpProvider from '../Context/PopUpContext'
import Banner from '../components/Banner'
import Row from '../components/Row'
import { Animated, family, kids } from '../store/URL'
import Character from '../components/Character'

function Kids() {

  return (
    <div>
      <PopUpProvider>
        <Banner />
      </PopUpProvider>
        <div className='bg-bg-custom '>
            <div className='relative -top-20'>
                <PopUpProvider>
                    <Row url={Animated} title={'Animated Movies'} />
                </PopUpProvider>
                <PopUpProvider>
                    <Row url={kids} title={'Today Top Picks for You'} />
                </PopUpProvider>
                <div>
                    <Character />
                </div>
                <PopUpProvider>
                    <Row url={family} title={"Tv Shows"} />
                </PopUpProvider>
            </div>
        </div>
    </div>
  )
}

export default Kids

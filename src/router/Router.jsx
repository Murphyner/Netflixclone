import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import PageLayout from '../layouts/PageLayout'
import Login from '../layouts/Login'
import Auth from '../components/Auth'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Main from '../pages/Main'
import MyList from '../pages/MyList'
import TvShows from '../pages/TvShows'
import Trailer from '../pages/Trailer'
import Search from '../pages/Search'
import Movies from '../pages/Movies'
import Kids from '../pages/Kids'
import Profile from '../pages/Profile'
import Mobile from '../pages/Mobile'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/'  element={
                <Auth>
                    <Login />
                </Auth>
            }>
                <Route path='/login' element={<Signin />} />
                <Route path='login/signup' element={<Signup />} />
                <Route path='/' element={<Main />} />
                <Route path='/mylist' element={<MyList />}/>
                <Route path='/tvshows' element={<TvShows />} />
                <Route path='/play/:id' element={<Trailer />}/>
                <Route path='/search' element={<Search />}/>
                <Route path='/tvshowsgrid' element={<TvShows />}/>
                <Route path=':genre' element={<TvShows />}/>
                <Route path='/movies' element={<Movies />} />
                <Route path='/moviesgrid' element={<Movies />}/>
                <Route path='movies/:moviesID' element={<Movies />} />
                <Route path='/kids' element={<Kids />}/>
                <Route path='/mobile/:id' element={<Mobile />}/>
            </Route>
            <Route>
                <Route path='/profiles/manage' element={<Profile />} />
            </Route>
        </>
    )
)

export default router

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// pages
import Home from './components/macro/home/home.tsx'
import Login from './components/macro/login/login.tsx'
import Signup from './components/macro/Signup/signup.tsx'
import ArtistPage from './components/macro/ArtistPage/ArtistPage.tsx'
import PlaylistPage from './components/macro/PlaylistPage/PlaylistPage.tsx'
//import Player from './components/macro/global/Player/Player.tsx'
import ProfilePage from './components/macro/ProfilePage/ProfilePage.tsx'
import ArtistProfilePage from './components/macro/ProfilePage/ArtistProfilePage/ArtistProfilePage.tsx'

// store
import store from './store'
import { Provider as StoreProvider } from 'react-redux'
import Musics from './components/macro/search/Musics/Musics.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/artists/:name/:id',
    element: <ArtistPage />
  },
  {
    path: '/tracks',
    element: <Musics id='1'/>
  },
  {
    path: '/profile/:name/:id',
    element: <ProfilePage id='1'/>
  },
  {
    path: '/profile/artist/:name/:id',
    element: <ArtistProfilePage id='1'/>
  },
  {
    path: '/playlist/:album/:name/:id',
    element: <PlaylistPage />
  },
  {
    path: '/playlists/:name/:id',
    element: <PlaylistPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
)

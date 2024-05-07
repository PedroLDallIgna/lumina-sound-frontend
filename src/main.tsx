import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import Home from './components/macro/home/home.tsx'
import Login from './components/macro/login/login.tsx'
import Signup from './components/macro/Signup/signup.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.scss'
import ArtistPage from './components/macro/ArtistPage/ArtistPage.tsx'
import PlaylistPage from './components/macro/PlaylistPage/PlaylistPage.tsx'
import Player from './components/macro/global/Player/Player.tsx'


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
    path: '/artists',
    element: <ArtistPage />
  },
  {
    path: '/playlists',
    element: <PlaylistPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Player
      musicUrl="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
      nameTrack="We Found Love (Album Version)"
      artist="Calvin Harris"
      album="Talk That Talk (Deluxe)"
      time="3:36"
    />
  </React.StrictMode>,
)

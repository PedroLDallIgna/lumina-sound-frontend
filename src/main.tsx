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
import Player from './components/macro/global/Player/Player.tsx'
import ProfilePage from './components/macro/ProfilePage/ProfilePage.tsx'

// store
import store from './store'
import { Provider as StoreProvider } from 'react-redux'

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
    path: '/playlists',
    element: <PlaylistPage />
  }
  ,
  {
    path: '/profile',
    element: <ProfilePage id='1'/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
      <Player
        musicUrl="https://lumina-sound.s3.sa-east-1.amazonaws.com/images/songs/Belivier_ImagineDragons.png"
        nameTrack="We Found Love (Album Version)"
        artist="Calvin Harris"
        album="Talk That Talk (Deluxe)"
        time="3:36"
      />
    </StoreProvider>
  </React.StrictMode>,
)

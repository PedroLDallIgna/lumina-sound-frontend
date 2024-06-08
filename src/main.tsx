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
import ProfilePage from './components/macro/ProfilePage/ProfilePage.tsx'
import ArtistProfilePage from './components/macro/ProfilePage/ArtistProfilePage/ArtistProfilePage.tsx'
import Musics from './components/macro/search/Musics/Musics.tsx'
import ArtistRegisterPage from './components/macro/ArtistRegisterPage/ArtistRegisterPage.tsx'

// store
import { Provider as StoreProvider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

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
    path: '/artists/:name',
    element: <ArtistPage />
  },
  {
    path: '/tracks',
    element: <Musics />
  },
  {
    path: '/profile',
    element: <ProfilePage/>
  },
  {
    path: '/profile/artist',
    element: <ArtistProfilePage />
  },
  {
    path: '/artists/register',
    element: <ArtistRegisterPage />
  },
  {
    path: '/albums/:id',
    element: <h1>Página do Álbum</h1>
  },
  {
    path: '/playlist/:album/:name/:id',
    element: <PlaylistPage />
  },
  {
    path: '/playlists/:id',
    element: <PlaylistPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </StoreProvider>
  </React.StrictMode>,
)

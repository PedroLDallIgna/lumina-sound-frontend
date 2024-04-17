import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import Home from './components/macro/home/home.tsx'
import Login from './components/macro/login/login.tsx'
import Signup from './components/macro/Signup/signup.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.scss'


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
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

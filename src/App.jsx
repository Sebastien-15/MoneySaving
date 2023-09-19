import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter as CBRouter,RouterProvider, } from "react-router-dom";
import { LandingPage } from './Pages/LandingPage';
import "./Styles.css"
import "./MainAppStyle.css"
import { LoginPage } from './Pages/Login';
import { MainPage } from './Pages/MainPage';
import { DashBoard } from './Pages/Dashboard';
import { History } from './Pages/History';
import { Settings } from './Pages/Settings';
import { LoadingPage } from './Pages/Loading';
import Features from './Pages/Features';
function App() {

  const [token, setToken] = useState()

  if (token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }



  useEffect(() => {

    if (sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
    
  }, [])

  const Router = CBRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    
    {
      path: "/features",
      element: <Features />
    },
    {
      path: "/login",
      element: <LoginPage setToken={setToken} />
    },
    {
      path: '/Welcome',
      element: <LoadingPage />
    },
    {
      path: '/main_page',
      element: <MainPage token={token}  />,
      children: [
        {
          path: "main_page/dashboard",
          element: <DashBoard />
        },
        {
          path: "main_page/history",
          element: <History />
        },
        {
          path: "main_page/settings",
          element: <Settings />
        }
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={Router}/>
    </>
  )
}

export default App

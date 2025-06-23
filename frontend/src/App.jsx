import { useEffect } from 'react'
import Header from './components/layout/header/Header.jsx'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import webFont from 'webfontloader'
import Layout from './components/layout/Layout.jsx'
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
    ]
  }])
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid", "Chilanka"]
      }
    })
  }, [])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App

import { useEffect } from 'react'
import Header from './components/layout/header/Header.jsx'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import webFont from 'webfontloader'
import Layout from './components/layout/Layout.jsx'
import { RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
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
      {
        path: '/product/:id',
        element: <ProductDetails />
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
      <RouterProvider router={router} />
    </>
  )
}

export default App

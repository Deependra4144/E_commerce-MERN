import { useEffect } from 'react'
import Header from './components/layout/header/Header.jsx'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import webFont from 'webfontloader'
import Layout from './components/layout/Layout.jsx'
import { RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx'
import Search from './components/Search.jsx'
import Login from './components/Login.jsx'
import Register from './components/user/Register.jsx'
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
        path: '/products',
        element: <Products />
      },
      {
        path: '/search/products',
        element: <Search />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/cart',
        element: <Cart />
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

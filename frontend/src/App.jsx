import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import webFont from 'webfontloader'
import {
  About,
  Cart,
  Home,
  Products,
  ProductDetails,
  Register,
  Login,
  Layout
} from './components/Index'
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

import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import webFont from 'webfontloader'
import {
  About,
  AccountDetail,
  AllUsers,
  Cart,
  Home,
  Products,
  ProductDetails,
  Register,
  Login,
  Layout,
  Addproduct,
  EditProfile,
  EditProduct,
  Dashboard
} from './components/Index'
import { useDispatch, useSelector } from 'react-redux'
import { isLogin } from './features/auth/authSlice'
import { Navigate } from 'react-router-dom';
import AllProducts from './components/pages/adminPages/AllProducts'
function App() {
  let dispatch = useDispatch()
  const { isAuthenticate, userRole } = useSelector(state => state.auth);
  // console.log(userRole)

  const ProtectedRoute = ({ children }) => {
    return isAuthenticate ? children : <Navigate to="/login" />;
  };

  const ProtectedAdminRoute = ({ children }) => {
    return ((userRole == 'admin') && (isAuthenticate)) ? children : <Navigate to="/" />;
  };

  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (userRole !== "admin") ? <Home /> : <Dashboard />

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
      {
        path: '/userAccount',
        element: <ProtectedRoute><AccountDetail /></ProtectedRoute>
      },
      {
        path: '/addProduct',
        element: <ProtectedAdminRoute> <Addproduct /> </ProtectedAdminRoute>
      },
      {
        path: '/allProduct',
        element: <ProtectedAdminRoute> <AllProducts /> </ProtectedAdminRoute>
      },
      {
        path: '/edit-profile',
        element: <ProtectedAdminRoute><EditProfile /></ProtectedAdminRoute>
      },
      {
        path: '/admin/allUsers',
        element: <ProtectedAdminRoute><AllUsers /></ProtectedAdminRoute>
      },
      {
        path: '/admin/products/edit/:id',
        element: <ProtectedAdminRoute><EditProduct /></ProtectedAdminRoute>

      },
      {
        path: '/admin/dashboard',
        element: <ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>
      }
    ]
  }])

  useEffect(() => {
    dispatch(isLogin())
    webFont.load({
      google: {
        families: ["Roboto", "Droid", "Chilanka"]
      }
    })

  }, [dispatch])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

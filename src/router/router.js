import { createBrowserRouter } from 'react-router-dom'
import Homepage from '../components/homepage/homepage'
import About from '../components/about/about'
import ProductPage from '../components/productPage/productpage'
import ProductSection from '../components/productSection/productSection'
import App from '../App'
import Login from '../components/login/login'
import LoginForm from '../components/loginForm/loginForm'
import SignupForm from '../components/signupForm/signupForm'
import Header from '../components/header/header';
import CartManage from '../components/cartManage/cartManage'
import Blog from '../components/blog/blog'
import Protected from '../components/protected/protected'
import Dashboard from '../components/dashboard/dashboard'
import AppContainer from '../AppContainer'
import AddNewProduct from '../components/dashboard/addNewProduct/addNewProduct'

const router = createBrowserRouter([
    {
            path: "/",
            element: <AppContainer />,
            children: [
                {
                    path: '/',
                    element: <App />,
                    children: [
                        {
                            //Homepage
                            path: "/",
                            element: <Homepage />
                        },
                        {
                            //ProductPage
                            path: "/product",
                            element: <ProductPage />
                        },
                        {
                            //List products by category
                            path: "/product-filter",
                            element: <ProductSection />
                        },
                        {
                            //Cart manage
                            path: "/cart-manage",
                            element: <CartManage />
                        },
                        {
                            //Blog
                            path: "/blog",
                            element: <Blog />
                        }
                    ]
                },
                {
                    //Login
                    path: "/",
                    element: <Login />,
                    children: [
                        {
                            //LoginForm
                            path: '/login',
                            element: <LoginForm />
                        },
                        {
                            //SignupForm
                            path: '/signup',
                            element: <SignupForm />
                        }
                    ]
                },
                {
                    path: '/',
                    element: <Protected>
                                <Dashboard />
                            </Protected>,
                    children: [
                        {
                            path: '/pending-order',
                            element: <h2>Orders</h2>
                        },
                        {
                            path: '/add-new-product',
                            element: <AddNewProduct />
                        }
                    ]
                },
                {
                    //About
                    path: "/about",
                    element: <About />
                }
            ]
        }
    ])
export default router
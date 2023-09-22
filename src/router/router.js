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

const router = createBrowserRouter([
    {
        path: "/",
        element: [<Header />, <App />],
        children: [
            {
                //Homepage
                path: "/",
                element: <Homepage />
            },
            {
                //About
                path: "/about",
                element: <About />
            },
            {
                //ProductPage
                path: "/product",
                element: <ProductPage />
            },
            {
                //List products by category
                path: "/product-by-category",
                element: <ProductSection />
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
            }
        ]
    }
    
])

export default router
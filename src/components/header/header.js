import { useCookies } from 'react-cookie'
import { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CartQuantityContext, CartContext, MessageContext } from '../../AppContainer'
import './header.css'
import { Input, Dropdown, Menu } from 'antd'
import { selectTypeOfPopup, showPopup } from '../popup/popup'
import Protected from '../protected/protected'

const { Search } = Input
export default function Header() {
    const [cookie, setCookie, removeCookie] = useCookies()
    const [user, setUser] = useState('Đăng nhập')
    const [items, setItems] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [cartQuantity, setCartQuantity] = useContext(CartQuantityContext)
    const [cart, setCart] = useContext(CartContext)
    const [message, setMessage] = useContext(MessageContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if ((typeof cookie.user) !== 'undefined') {
            fetch('/api/users/addToCart', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: cookie.user, cart: []})
            })
            .then(res => res.json())
            .then((cart) => {
                setCart(cart)
            })
            .catch(error => console.log(error))
            setUser('Chào '.concat(cookie.user))
            document.getElementById('logout').style.display = 'block'
        }
        else {
            document.getElementById('logout').style.display = 'none'
            setUser('Đăng nhập')
            setCart({ cartItems: [], totalQuantity: 0 })
        }
    }, [cookie.user])

    useEffect(() => {
        setCartQuantity(cart.totalQuantity || 0)
    }, [cart])

    function handleLogout() {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status === 200) {
                removeCookie('user')
                removeCookie('isAdmin')
                document.body.style.animationName = 'fadeIn'
                navigate('/../')
            }
            else {
                console.log('Logout failed!!')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleSearch(event) {
        if (event.target.value !== '') {
            fetch('/api/search', {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchInput: event.target.value })
            })
            .then(results => results.json())
            .then(results => {
                setSearchResults(results)
                let temp = []
                results.forEach(result => {
                    temp.push({ label: (<p onClick={() => navigate('../product', {state: result})}>{result.name}</p>)})
                })
                setItems(temp)
            })
            .catch(err => console.log(err))
        }
        else setItems([])
    }

    function handleCartClick() {
        if (typeof cookie.user !== 'undefined') {
            let idArr = []
            cart.cartItems.forEach(item => {
                idArr.push(item.id)
            })

            fetch('/api/products/getProductsById', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productID: idArr })
            }).then(res => res.json())
            .then(products => {
                products.forEach((product) => {
                    cart.cartItems.forEach(item => {
                        if (item.id === product._id)
                            product.cartQuantity = item.quantity
                    })
                })
                navigate('/cart-manage', {
                    state: products
                })
            })
            .catch(error => console.log(error))
        }
        else {
            navigate('/login')
            selectTypeOfPopup('WARNING')
            setMessage('Bạn vui lòng đăng nhập để xem giỏ hàng')
            showPopup()
        }
    }

    function handleSideMenuSwitch() {
        if (document.getElementById('sideMenu').style.transform === 'translateX(-100vw)' || document.getElementById('sideMenu').style.transform === '')
            document.getElementById('sideMenu').style.transform = 'translateX(0vw)'
        else
            document.getElementById('sideMenu').style.transform = 'translateX(-100vw)'
    }

    return (
        <div id="header">
            <div id='logo'>
                <a href='/'><img src='logo.jpg' alt='logo' /></a>
            </div>
            <div id='sideMenuSwitch' >
                <img src='dropMenu.png' alt='side menu switch' onClick={ handleSideMenuSwitch }/>
            </div>
            <div id='search'>
                <Dropdown menu={{ items }} placement='bottom' trigger={['click']} >
                    <Search placeholder="Nhập từ khóa để tìm sản phẩm" onChange={handleSearch} onSearch={handleSearch} size='large' style={{ width: '60%', margin: 'auto' }} enterButton={ <img src='search.png' style={{ maxHeight: '100%', padding: '8px', objectFit: 'contain' }}/> } onPressEnter={() => {
                        navigate('/product-filter', { state: searchResults, replace: true }) 
                        setItems([])}}/>
                </Dropdown>
            </div>
            
            <div id='userInfo'>
                <div id='cart' >
                    <p id='productQuantityInCart'>{ cartQuantity }</p>
                    <img src='cart.png' alt='cart' onClick={ handleCartClick }/>
                </div>
                <div id='user'>
                    <a href='/login' style={{textDecoration: cookie.user ? 'none' : 'underline', color: '#0474e4', margin: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', pointerEvents: cookie.user ? 'none' : 'auto'}} >{ user }</a>
                    <img id='logout' onClick={ handleLogout } src='logout.png' alt='logout' />
                </div>
            </div>
        </div>
    )
}
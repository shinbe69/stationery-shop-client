import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useEffect, useState, useRef, useContext} from 'react'
import { showPopup, selectTypeOfPopup } from '../popup/popup'
import { MessageContext, CartContext } from '../../AppContainer'
import './cartManage.css'
import Item from './item'

export default function CartManage () {
    const [cart, setCart] = useContext(CartContext)
    const [message, setMessage] = useContext(MessageContext)
    const [cookie, setCookie, removeCookie] = useCookies()
    const navigate = useNavigate()
    const products = useLocation().state
    const [address, setAddress] = useState('')
    const [buttonContent, setButtonContent] = useState('Đặt hàng')
    const intervalID = useRef()
    const timer = useRef(5)

    let totalPrice = 0
    products.forEach(item => {
        totalPrice += item.price * item.cartQuantity
    })

    useEffect(() => {
        fetch('/api/users/getUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: cookie.user })
        }).then(result => result.json())
        .then(user => setAddress(user.address))
        .catch(error => console.log(error))
    }, [])


    function handlePurchase() {
        if (address === '') {
            selectTypeOfPopup('WARNING')
            setMessage('Bạn chưa có thông tin địa chỉ trong hệ thống. Vui lòng bổ sung thêm')
            showPopup()
        }
        else {
            if (timer.current !== 5) {
                let prepareItems = []
                products.forEach(product => {
                    prepareItems.push({ id: product._id, quantity: product.cartQuantity })
                })
                fetch('/api/orders/createOrder', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ items: prepareItems, address, username: cookie.user, value: totalPrice })
                }).then(res => res.json())
                .then(orderID => {
                    fetch('/api/users/removeFromCart', {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: cookie.user, cart: cart.cartItems})
                    }).then(result => result.json())
                    .then(cart => {
                        setCart({ cartItems: [], totalQuantity: 0 })
                        selectTypeOfPopup('SUCCESS')
                        setMessage('Đơn hàng được tạo thành công, vui lòng chờ xác nhận từ nhân viên')
                        showPopup()
                        setTimeout(() => {
                            navigate('/')
                        }, 700)
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => {
                    console.log(error)
                    selectTypeOfPopup('WARNING')
                    setMessage('Có lỗi xảy ra, bạn vui lòng thử lại')
                    showPopup()
                })
            }
            else {
                selectTypeOfPopup('WARNING')
                setMessage('Vui lòng kiểm tra lại thông tin một lần nữa')
                showPopup()
                document.getElementById('purchase').style.cursor = 'not-allowed'
                document.getElementById('purchase').setAttribute('disabled', 'true')
                setButtonContent('( ' + timer.current + 's ) Xác nhận')
                intervalID.current = setInterval(() => {
                    timer.current -= 1
                    setButtonContent('( ' + timer.current + 's ) Xác nhận')
                }, 1000)
                setTimeout(() => {
                    clearInterval(intervalID.current)
                    document.getElementById('purchase').style.cursor = 'pointer'
                    document.getElementById('purchase').removeAttribute('disabled')
                    setButtonContent('Xác nhận')
                }, 5000)
            }
        }
    }

    function handleShowOrders() {
        navigate('/')
    }
    
    return (
        <div id="cartManage">
            <button id='showOrders' onClick={ handleShowOrders }>Xem đơn hàng</button>
            <h2>Các sản phẩm đang chờ trong giỏ hàng</h2>
            <div id='cartItemsContainer'>
                <div id='cartListHeader' >
                    <h3 style={{ width: '50%', textDecoration: 'underline' }}>Sản phẩm</h3>
                    <hr />
                    <h3 style={{ width: '25%', textDecoration: 'underline' }}>Đơn giá</h3>
                    <hr />
                    <h3 style={{ width: '25%', textDecoration: 'underline' }}>Số lượng</h3>
                </div>
                {products.map(product => (
                    <Item key={ product._id } product={ product } />
                ))}
            </div>
            <div style={{ position: 'sticky', bottom: '0px', zIndex: '3', WebkitBackdropFilter: 'blur(5px)', backdropFilter: 'blur(5px)', padding: '1em 0'}}>
            { products.length === 0 ? <h3>Giỏ hàng của bạn đang trống</h3> : <>
            <div className='seperateLine'></div>
                <div id='paymentInfo' >
                    
                    <div id='addressConfirm'>
                        <h3 style={{ textDecoration: 'underline' }}>Địa chỉ giao hàng:</h3>
                        <p>{ !address ? 'Bạn chưa có thông tin địa chỉ' : address}</p>
                        <p id='changeAddress' onClick={ () => navigate('/update-user-info', {
                            state: cookie.user
                        })}>{!address ? 'Bổ sung' : 'Thay đổi địa chỉ'}</p>
                    </div>
                    <div id='paymentMethod'>
                        <h3 style={{ textDecoration: 'underline', marginBottom: '1em' }}>Phương thức thanh toán:</h3>
                        <select style={{ width: '100%', height: '3em', padding: '0.2em', fontSize: '1em' }}>
                            <option>Thanh toán khi nhận hàng (COD)</option>
                            <option disabled>Thanh toán qua thẻ ATM nội địa (đang phát triển)</option>
                        </select>
                    </div>
                    <div id='purchaseContainer'>
                        <h3 style={{ textDecoration: 'underline', marginBottom: '1em' }}>Thành tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice) }</h3>
                        <button id='purchase' onClick={ handlePurchase } >{ buttonContent }</button>
                    </div>
                </div>
                <div className='seperateLine'></div>
            </> }
            </div>
        </div>
    )
}
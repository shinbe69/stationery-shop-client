import { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { CartQuantityContext, CartContext, MessageContext } from '../../AppContainer'
import { showPopup, selectTypeOfPopup } from '../popup/popup'


export default function Item({ product }) {
    const navigate = useNavigate()
    const [cookie, setCookie] = useCookies()
    const [cart, setCart] = useContext(CartContext)
    const [message, setMessage] = useContext(MessageContext)
    const [cartQuantity, setCartQuantity] = useContext(CartQuantityContext)
    const [quantity, selectQuantity] = useState(product.cartQuantity)

    function handleChangeItemQuantity(event) {
        let action = ''
        switch (event.target.className) {
            case 'removeCartItem':
                action = 'removeFromCart'
                setMessage('Xóa sản phẩm thành công')
                break
            case 'subtract':
                action = 'removeFromCart'
                setMessage('Giảm số lượng thành công')
                break
            case 'plus':
                action = 'addToCart'
                setMessage('Tăng số lượng thành công')
                break
        }

        fetch('/api/users/'.concat(action), {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: cookie.user, cart: [{id: product._id, quantity: event.target.className === 'removeCartItem' ? quantity : 1}]})
        }).then(result => result.json())
        .then(cart => {
            setCartQuantity(cart.totalQuantity)
            setCart(cart)
            selectTypeOfPopup('SUCCESS')
            showPopup()
            updateCartManagePage(cart)
        })
        .catch(error => console.log(error))
    }

    function updateCartManagePage(inputCart) {
        let idArr = []
            inputCart.cartItems.forEach(item => {
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
                    inputCart.cartItems.forEach(item => {
                        if (item.id === product._id)
                            product.cartQuantity = item.quantity
                    })
                })
                navigate(typeof cookie.user !== 'undefined' ? '/cart-manage' : '/login', {
                    state: products
                })
            })
            .catch(error => console.log(error))
    }

    return (
        <div id="cartItem">
            <div id="itemThumnail">
                <img src={ product.thumnail } />
            </div>
            <p style={{ width: '35%'}}>{ product.name }</p>
            <h4 id="unitPrice" >{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) }</h4>
            <div id="itemQuantity" style={{ height: '100%', display: 'flex'}}>
                <div id='selectQuantity' style={{ width: '40%', height: '40%', margin: 'auto' }}>
                    <div className='subtract' style={{ fontWeight: 'bold', width: '25%', display: 'flex' }} onClick={(event) => {
                        if (quantity > 1) selectQuantity(quantity - 1)
                        handleChangeItemQuantity(event)
                        }}>
                        <p className='subtract'>-</p>
                    </div>
                    <hr style={{ margin: '0.4em 0' }} />
                    <p id='quantity' style={{ fontWeight: 'bold', width: '50%', textAlign: 'center' }}>{quantity}</p>
                    <hr style={{ margin: '0.4em 0' }} />
                    <div className='plus' style={{ fontWeight: 'bold', width: '25%', display: 'flex' }} onClick={(event) => {
                        selectQuantity(quantity + 1) 
                        handleChangeItemQuantity(event)
                        }}>
                        <p className='plus'>+</p>
                    </div>
                </div>
                <p id='removeCartItem' className='removeCartItem' onClick={ handleChangeItemQuantity } >Xóa</p>
            </div>
        </div>
    )
}
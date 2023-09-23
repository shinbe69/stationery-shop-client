import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import './productPage.css'

export default function ProductPage() {
    const product = useLocation()
    const [cookie, setCookie, removeCookie] = useCookies()
    const [quantity, selectQuantity] = useState(1)

    function handleAddToCart() {
        if (typeof cookie.cart === 'undefined') {
            setCookie('cart', [{id: product.state.id, quantity}], { maxAge: 60*60*24 })
        }
        else {
            cookie.cart.push({id: product.state.id, quantity})
            setCookie('cart', cookie.cart, { maxAge: 60*60*24 })
        }
        console.log(cookie.cart)
    }

    return (
        <div id="productPage" >
            <div id='productThumnail' >
                <img src={ product.state.thumnail } alt='product thumnail' />
            </div>
            <div id='productInfo'>
                <div id='addToCartSection'>
                    <p style={{ whiteSpace: 'nowrap', color: '#999' }}>Số lượng</p>
                    <div id='selectQuantity'>
                        <div style={{ fontWeight: 'bold', width: '25%', display: 'flex' }} onClick={() => quantity === 1 ? {} : selectQuantity(quantity - 1) }>
                            <p>-</p>
                        </div>
                        <hr style={{ margin: '0.4em 0' }} />
                        <p id='quantity' style={{ fontWeight: 'bold', width: '50%', textAlign: 'center' }}>{quantity}</p>
                        <hr style={{ margin: '0.4em 0' }} />
                        <div style={{ fontWeight: 'bold', width: '25%', display: 'flex' }} onClick={() => selectQuantity(quantity + 1) }>
                            <p >+</p>
                        </div>
                    </div>
                    <div id='addToCartButton' onClick={ handleAddToCart }>
                        <img src="add-to-cart.png" alt="add-to-cart" style={{ margin: 'auto' }} />
                        <p style={{ whiteSpace: 'nowrap', margin: 'auto', color: '#FFFFFF' }} ><b>Thêm vào giỏ hàng</b></p>
                    </div>
                </div>
                <div id='specificInfo'>
                    <h3>Thông tin sản phẩm</h3>
                    <p><label style={{ color: '#999' }} >Tên:</label> &ensp;{ product.state.name }</p>
                    <p><label style={{ color: '#999' }}>Mô tả:</label> &ensp;{ product.state.description }</p>
                    <p style={{ color: '#FF9B9B' }}><label style={{ color: '#999' }}>Giá:</label> &ensp;
                        <b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.state.price) }</b>
                    </p>
                </div>
            </div>
            <div className='seperator'>
                &#9671;<hr style={{ width: '60%', margin: 'auto' }} />&#9671;
            </div>
            <div id='additionalInfo'>
                <h3>Thông tin chi tiết</h3>
                <p>{ product.state.additionalInfo || 'Đang cập nhật'}</p>
            </div>
        </div>
    )
}
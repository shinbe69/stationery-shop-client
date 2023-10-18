import { useLocation } from 'react-router-dom'
import './cartManage.css'
import Item from './item'

export default function CartManage () {
    const products = useLocation().state
    let totalPrice = 0
    products.forEach(item => {
        totalPrice += item.price * item.cartQuantity
    })
    
    return (
        <div id="cartManage">
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
            <div style={{ position: 'sticky', bottom: '0px', zIndex: '3', WebkitBackdropFilter: 'blur(5px)', backdropFilter: 'blur(5px)', padding: '1em 0' }}>
                { products.length === 0 ? <h3>Giỏ hàng của bạn đang trống</h3> : <>
                    <h3 style={{ textDecoration: 'underline', marginBottom: '1em' }}>Thành tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice) }</h3>
                    <div id='purchase'>Thanh toán</div>
                </> }
            </div>
        </div>
    )
}
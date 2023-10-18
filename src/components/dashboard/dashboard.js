import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './dashboard.css'

export default function Dashboard() {
    const [cookie, setCookie, removeCookie] = useCookies()
    const navigate = useNavigate()
    
    return (
        <div id="dashboard">
            <div className='sideMenu' style={{ backgroundColor: '#f5f5f0' }} >
                <h4 style={{ textDecoration: 'underline' }}>Thao tác</h4>
                <div className='categoryItem' onClick={() => navigate('/add-new-product', {
                    state: cookie.isAdmin
                })}>
                    <img src='./add-product.png' alt="category item" />
                    <hr style={{ margin: '0 1rem' }} />
                    <p>Thêm sản phẩm mới</p>
                </div>
                <div className='categoryItem'>
                    <img src='./new-blog.png' alt="category item" />
                    <hr style={{ margin: '0 1rem' }} />
                    <p>Tạo bài viết mới</p>
                </div>
                <div className='categoryItem' onClick={() => navigate('/pending-order', {
                    state: cookie.isAdmin
                })}>
                    <img src='./pending-order.png' alt="category item" />
                    <hr style={{ margin: '0 1rem' }} />
                    <p>Đơn hàng đang chờ xác nhận</p>
                </div>
            </div>
            <hr style={{ margin: '0 1em' }} />
            <div id='controlPanel'>
                <Outlet />
            </div>
        </div>
    )
}
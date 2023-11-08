import { useEffect, useState, useContext } from "react"
import { useCookies } from "react-cookie"
import { showPopup, selectTypeOfPopup } from "../../../popup/popup"
import { MessageContext } from "../../../../AppContainer"

export default function Order({ order }) {
    const [cookie] = useCookies()
    const [message, setMessage] = useContext(MessageContext)
    const [status, setStatus] = useState('')
    const [orderColor, setOrderColor] = useState('')
    useEffect(() => {
        switch (order.status) {
            case 'unconfirmed':
                setStatus('Đang chờ xác nhận')
                setOrderColor('repeating-linear-gradient(180deg,#FFA500,#FFA500 1em,transparent 0,transparent 2em, #FFA500,#FFA500 1em)')
                break
            case 'confirmed':
                setStatus('Đang chờ vận chuyển')
                setOrderColor('repeating-linear-gradient(180deg,#08acec,#08acec 1em,transparent 0,transparent 2em, #08acec,#08acec 1em)')
                break
            case 'onroad':
                setStatus('Đang vận chuyển')
                break
            case 'discarded':
                setStatus('Đã hủy')
                setOrderColor('repeating-linear-gradient(180deg,#ff0000,#ff0000 1em,transparent 0,transparent 2em, #ff0000,#ff0000 1em)')
                break
            case 'deliveried':
                setStatus('Giao thành công')
                setOrderColor('repeating-linear-gradient(180deg,#00C851,#00C851 1em,transparent 0,transparent 2em, #00C851,#00C851 1em)')
                break
        }
    }, [])

    function handleConfirmOrder() {
        fetch('/api/orders/confirmOrder', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ orderID: order._id })
        }).then(res => {
            if (res.ok) {
                selectTypeOfPopup('SUCCESS')
                setMessage('Xác nhận đơn hàng thành công')
                showPopup()
                order.status = 'confirmed'
            }
            else {
                selectTypeOfPopup('WARNING')
                setMessage('Có lỗi xảy ra, vui lòng thử lại')
                showPopup()
            }
        })
    }

    return (
        <div className="order">
            <div style={{ width: '10%', position: 'relative' }}>
                <div className="seperateLineOrder" style={{ backgroundImage: orderColor }} ></div>
            </div>
                <div className="orderInfo">
                    <div className="orderInfoItem">
                        <label style={{ textDecoration: 'underline', fontWeight: 'bold' }}>ID:</label>
                        <p>{ order._id }</p>
                    </div>
                    <div className="orderInfoItem">
                        <label style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Trạng thái:</label>
                        <p>{ status }</p>
                    </div>
                    <div className="orderInfoItem">
                        <label style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Được tạo vào:</label>
                        <p>{ new Date(order.createAt).toLocaleString() }</p>
                    </div>
                    <div className="orderInfoItem">
                        <label style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Được tạo bởi user:</label>
                        <p>{ order.user }</p>
                    </div>
                    <div className="orderInfoItem">
                        <label style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Giá trị đơn hàng:</label>
                        <p style={{ color: '#FF9B9B', fontWeight: 'bold' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.value)}</p>
                    </div>
                    <div className="orderQuickAction">
                        <div style={{ width: 'fit-content', margin: 'auto' }}>
                            { cookie.isAdmin ? order.status === 'unconfirmed' ? <button onClick={ handleConfirmOrder }>Xác nhận</button> : <></> : <></> }
                            <button >Chi tiết</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}
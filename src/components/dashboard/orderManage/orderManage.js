import { useEffect, useState } from "react"
import Order from "./order/order"
import './orderManage.css'

export default function OrderManage() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('/api/orders/getOrders')
        .then(res => res.json())
        .then(orders => setOrders(orders))
        .catch(err => console.log(err))
    }, [])

    return (
        <div id="orderManage">
            <div id="orderContainer">
                { orders.map(order => (
                    <Order key={ order._id } order={order} />
                )) }
            </div>
        </div>
    )
}
import { useNavigate } from "react-router-dom"

export default function Product(props) {
    const navigate = useNavigate()

    function forwardToProduct() {
        navigate('/product', {
            state: props
        })
    }

    function addToCart() {
        
    }

    return(
        <div className="product" onClick={ forwardToProduct }>
            <div className="productThumnail">
                <img src={ props.thumnail } alt="thumnail" />
            </div>
            <div className="productInfo">
                <p>{ props.name }</p>
                <p style={{ color: '#FF9B9B' }} ><b>{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.price) }</b></p>
            </div>
        </div>
    )
}
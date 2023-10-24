import { useNavigate } from "react-router-dom"

export default function Product({ product }) {
    const navigate = useNavigate()

    function forwardToProduct() {
        navigate('/product', {
            state: product
        })
    }

    function addToCart() {
        
    }

    return(
        <div className="product" onClick={ forwardToProduct }>
            <div className="productThumnail">
                <img src={ product.thumnail } alt="thumnail" />
            </div>
            <div className="productInfo">
                <p>{ product.name }</p>
                <p style={{ color: '#FF9B9B' }} ><b>{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) }</b></p>
            </div>
        </div>
    )
}
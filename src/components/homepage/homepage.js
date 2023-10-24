import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './homepage.css'
import ProductSection from '../productSection/productSection'
import Product from '../product/product'


export default function Homepage() {
    const navigate = useNavigate()
    const [bestSelling, setBestSelling] = useState([])
    const [recentProducts, setRecentProducts] = useState([])
    const index = useRef(0)

    useEffect(() => {
        fetch('/api/products/getProducts', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({ filter: 'bestsell' })
        })
        .then(res => res.json())
        .then(products => {
            let size = products.length
            if (size !== 0) {
                setBestSelling(products[index.current])
                setInterval(() => {
                    index.current === size -1 ? index.current = 0 : index.current++
                    setBestSelling(products[index.current])
                    
                }, 8000)
            }
        })
        .catch(error => console.log(error))

        fetch('/api/products/getProducts', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({ filter: 'recently' })
        })
        .then(res => res.json())
        .then(products => {
            setRecentProducts(products)
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <div id="homepage">
            {bestSelling.length !== 0 ? 
            <div id='slideShow'>
                <h3 style={{ position: 'absolute', top: '0.5em', left: '1em', color: '#FFFFFF', zIndex: '3' }} >Sản phẩm bán chạy</h3>
                <div id='item' onClick={() => navigate('/product', {
                    state: bestSelling
                })}>
                    <img src={bestSelling.thumnail} alt='popular item' />
                </div>
                <div id='itemInfo'>
                    <p>{ bestSelling.name }</p>
                    <p>{ bestSelling.description }</p>
                </div>
            </div> : <></> }
            <h3 style={{ textAlign: 'left', marginBottom: '1em', textDecoration: 'underline' }} >Sản phẩm mới thêm gần đây</h3>
            <div id='recentProducts'>
                { recentProducts.map(product => (
                    <Product key={product._id} product={product} />
                )) }
            </div>
        </div>
    )
}
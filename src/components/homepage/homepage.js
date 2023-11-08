import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'antd'
import './homepage.css'
import ProductSection from '../productSection/productSection'
import Product from '../product/product'


export default function Homepage() {
    const navigate = useNavigate()
    const [bestSelling, setBestSelling] = useState([])
    const [recentProducts, setRecentProducts] = useState([])

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
                setBestSelling(products)
                // setInterval(() => {
                //     index.current === size -1 ? index.current = 0 : index.current++
                //     setBestSelling(products[index.current])
                    
                // }, 7000)
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
            <>
                <h3 style={{ textAlign: 'left', margin: '1em 0' }} >Sản phẩm bán chạy</h3>
                {/* <div id='slideShow'>
                    
                    <div id='item' onClick={() => navigate('/product', {
                        state: bestSelling
                    })}>
                        <img src={bestSelling.thumnail} alt='popular item'  />
                    </div>
                    <div id='itemInfo'>
                        <p style={{ fontWeight: 'bold' }}>{ bestSelling.name }</p>
                        <hr style={{ width: '60%', margin: 'auto' }} />
                        <p id='itemDescription'>{ bestSelling.description }</p>
                    </div>
                    
                </div> */}
                <Carousel autoplay autoplaySpeed={8000} style={{ height: '45vh', padding: '0' }}>
                    {bestSelling.map(item => (
                        <div key={item._id} className='item' onClick={() => navigate('/product', {
                            state: item
                        })}>
                            <img src={item.thumnail} alt='popular item'  />
                            <div className='itemInfo'>
                            <p style={{ fontWeight: 'bold' }}>{ item.name }</p>
                            <div className='separator' />
                            <p className='itemDescription'>{ item.description }</p>
                        </div>
                        </div>
                    ))}
                </Carousel>
                {/* <Carousel autoplay style={{ height: '45vh' }}>
                    {bestSelling.map(item => (
                        <h2>{item.name}</h2>
                    ))}
                </Carousel> */}
            </> : <></> }
            <h3 style={{ textAlign: 'left', margin: '1em 0', textDecoration: 'underline' }} >Sản phẩm mới thêm gần đây</h3>
            <div id='recentProducts'>
                { recentProducts.map(product => (
                    <Product key={product._id} product={product} />
                )) }
            </div>
        </div>
    )
}
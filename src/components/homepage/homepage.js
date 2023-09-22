import './homepage.css'
import ProductSection from '../productSection/productSection'

export default function Homepage() {
    return (
        <div id="homepage">
            <div id='slideShow'>
                <div id='item'>
                    <img src='https://wallpapercave.com/wp/wp6774815.jpg' alt='popular item' />
                </div>
                <div id='itemInfo'>
                    <p>Product name</p>
                    <p>Product description</p>
                </div>
            </div>
            <ProductSection />
        </div>
    )
}
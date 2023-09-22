import { useContext } from 'react'
import { ProductSectionContext } from '../../App'
import Product from '../product/product'
import './productSection.css'

export default function ProductSection() {
    const products = useContext(ProductSectionContext)

    return (
        <div id='productSection'>
            { products.map(product => (
                <Product id={product._id} key={product._id} thumnail={product.thumnail} name={product.name} description={product.description} additionalInfo={product.additionalInfo} price={product.price} />
            ))}
        </div>
    )
}
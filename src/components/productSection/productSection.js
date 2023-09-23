import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ProductSectionContext } from '../../App'
import Product from '../product/product'
import './productSection.css'

export default function ProductSection() {
    const productsFromNavigate = useLocation().state
    const productsFromContext = useContext(ProductSectionContext)

    return (
        <div id='productSection'>
            { (productsFromNavigate || productsFromContext).map(product => (
                <Product id={product._id} key={product._id} thumnail={product.thumnail} name={product.name} description={product.description} additionalInfo={product.additionalInfo} price={product.price} />
            ))}
        </div>
    )
}
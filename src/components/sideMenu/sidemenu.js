import { useState, useEffect } from 'react'
import './sidemenu.css'

export default function SideMenu() {
    const [categories, setCategories] = useState([])
    const [selection, setSelection] = useState('')

    useEffect(() => {
        fetch('/api/getCategories')
        .then(res => res.json())
        .then(categories => setCategories(categories))
    }, [])

    useEffect(() => {
        if (selection !== '') {
            fetch('/api/products/getProducts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryId: selection })
            })
            .then(res => res.json())
            .catch((error) => console.log(error))
        }
    }, [selection])

    return (
        <div id="sideMenu" >
            {categories.map(category => (
                <div className="categoryItem" key={ category._id } onClick={ () => setSelection(category._id) } style={ category._id === selection ? { backgroundColor: '#dedcdc' } : {}} >
                    <img src={ category.thumnail } alt="category item" />
                    <hr style={{ margin: '0 1rem' }} />
                    <p>{ category.name }</p>
                </div>
            ))}
        </div>
    )
}
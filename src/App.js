import './App.css';
import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react';

export const ProductSectionContext = createContext()

export default function App() {
  const [categories, setCategories] = useState([])
  const [selection, setSelection] = useState('')
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

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
      .then(products => setProducts(products))
      .catch((error) => console.log(error))
      // Show clear category button
      document.getElementById('clearCategoryFilter').style.display = 'block'
      navigate('/product-by-category')
    }
    else {
      fetch('/api/products/getProducts')
      .then(res => res.json())
      .then(products => setProducts(products))
      .catch((error) => console.log(error))
      // Hide the clear category button
      document.getElementById('clearCategoryFilter').style.display = 'none'
    }
  }, [selection])

  function handleSideMenuSwitch() {
    document.getElementById('sideMenuSwitch').style.display = 'none'
    document.getElementById('sideMenu').style.transform = 'translateX(0vw)'
  }

  return (
    <div id='app'>
      <div id="sideMenu" >
        {categories.map(category => (
          <div className="categoryItem" key={ category._id } onClick={ () => setSelection(category._id) } style={ category._id === selection ? { backgroundColor: '#dedcdc' } : {}} >
            <img src={ category.thumnail } alt="category item" />
            <hr style={{ margin: '0 1rem' }} />
            <p>{ category.name }</p>
          </div>
        ))}
        <div className='categoryItem' id='clearCategoryFilter' onClick={() => setSelection('') }>
          <img src='./close.png' alt='clear selection'/>
        </div>
      </div>
      <div id='sideMenuSwitch' onClick={ handleSideMenuSwitch }>
        <img src='dropMenu.png' alt='side menu switch'/>
      </div>
      <div id='content' >
        <ProductSectionContext.Provider value={products} >
          <Outlet />
        </ProductSectionContext.Provider>
      </div>
    </div>
  );
}
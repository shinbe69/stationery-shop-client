import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';

export const ProductSectionContext = createContext()

export default function App() {
  const [cookie, setCookie, removeCookie] = useCookies()
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
      fetch('/api/products/getProductsByCategory', {
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
      navigate('/product-filter')
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

  function handleShowDashboard() {
    navigate('/pending-order', {
      state: cookie.isAdmin
    })
  }

  return (
    <div id='app'>
      <div className="sideMenu">
        <div id='categoryContainer'>
          <h4 style={{ textDecoration: 'underline' }}>Danh mục sản phẩm</h4>
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
        {/* <div id='recentBlogs'>
          <h4 style={{ textDecoration: 'underline' }}>Bài viết gần đây</h4>
          {categories.map(category => (
            <div className="categoryItem" key={ category._id } onClick={ () => setSelection(category._id) } style={ category._id === selection ? { backgroundColor: '#dedcdc' } : {}} >
              <p>{ category.name }</p>
            </div>
          ))}
        </div> */}
        { typeof cookie.user !== 'undefined' && cookie.isAdmin ? 
          <div id='showDashboard'>
            <div className='categoryItem' onClick={ handleShowDashboard }>
              <img src='./settings.png' alt="category item" />
              <hr style={{ margin: '0 1rem' }} />
              <p>Trang quản lý</p>
            </div>
          </div>
          : <></>
        }
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
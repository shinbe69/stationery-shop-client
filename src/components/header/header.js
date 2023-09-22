import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'


export default function Header() {
    const [cookie, setCookie, removeCookie] = useCookies()
    const [user, setUser] = useState('Đăng nhập')
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if ((typeof cookie.user) !== 'undefined') {
            setUser((cookie.user).substring(0, 7) + '...')
            document.getElementById('logout').style.display = 'block'
        }
        else {
            setUser('Đăng nhập')
            document.getElementById('logout').style.display = 'none'
        }
    }, [cookie.user])

    useEffect(() => {
        document.getElementById('searchResultsDisplay').style.display = 'block'
    }, [searchResults])

    function handleLogout() {
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status === 200) {
                removeCookie('user')
                document.body.style.animationName = 'fadeIn'
            }
            else {
                console.log('Logout failed!!')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleSearch(event) {
        if (event.target.value !== '') {
            fetch('/api/search', {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchInput: event.target.value })
            })
            .then(results => results.json())
            .then(searchResults => setSearchResults(searchResults))
            .catch(err => console.log(err))
        }
        else setSearchResults([])
    }

    function handleSearchResultClick(result) {
        // navigate('/product', { state: result })
        fetch('/api/products/getSpecificProduct', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productID: result.id })
        })
        .then(product => product.json())
        .then(product => {
            document.getElementById('searchResultsDisplay').style.display = 'none'
            navigate('/product', { state: product})
        })
        .catch(err => console.log(err))
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape')
            document.getElementById('searchResultsDisplay').style.display = 'none'
        else if (event.key === 'Enter') {
            document.getElementById('searchResultsDisplay').style.display = 'none'
            navigate('/signup')
        }
    }

    return (
        <div id="header">
            <div id='logo'>
                <a href='/'><img src='logo.jpg' alt='logo' /></a>
            </div>
            <div id='search'>
                <input type="text" onChange={ handleSearch } onClick={ handleSearch } onKeyDown={ handleKeyDown } placeholder="Nhập từ khóa để tìm sản phẩm">
                </input>
                <div id='searchResultsDisplay'>
                    {searchResults.map(result => (
                        <div onClick={() => handleSearchResultClick(result) }>
                            <img src='search.png' alt='searchIcon'/>
                            <p >{result.name} </p>
                        </div>
                    ))}
                </div>
            </div>
            <div id='userInfo'>
                <div id='cart'>
                    <p id='productQuantityInCart'>5</p>
                    <img src='cart.png' alt='cart' />
                </div>
                <div id='user'>
                    <a href='/login' style={{textDecoration: 'underline', color: '#0474e4', margin: 'auto', whiteSpace: 'nowrap', overflow: 'hidden'}}>{ user }</a>
                    <img id='logout' onClick={ handleLogout } src='logout.png' alt='logout' />
                </div>
            </div>
        </div>
    )
}
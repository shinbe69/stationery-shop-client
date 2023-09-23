import { useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { MessageContext } from '../login/login'

export default function LoginForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useContext(MessageContext)

    //handle submit button
    function handleLogin(event) {
        event.preventDefault()
        if (!username.includes('@') && !username.includes('0')) {
            setMessage('Vui lòng nhập email hoặc số điện thoại hợp lệ!')
            showPopup()
        }
        else if (password.length < 6) {
            setMessage('Mật khẩu phải có ít nhất 6 ký tự!')
            showPopup()
        }
        else {
            //lOGIN
            fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({username: username, password: password})})
            .then((response) => {
                if (response.status === 200) {
                    document.location = '/'
                }
                else {
                    setMessage('Tên đăng nhập hoặc mật khẩu không đúng!')
                    showPopup()
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    //handle change event of a username and password
    function handleChange(event) {
        let tartget = event.target.name
        if(tartget === "username") {
            setUsername(event.target.value)
        }
        else if(tartget === 'password'){    
            setPassword(event.target.value)
        }
    }


    function showPopup() {
        document.getElementById('warningPopup').style.transform = 'translateY(-10vh)'
        setTimeout(() => {
            document.getElementById('warningPopup').style.transform = 'translateY(-50vh)'
        }, 2500)
    }

    return (
        <form id='loginForm' className='form'>
            <input type='text' name='username' onChange={handleChange} placeholder='Email hoặc số điện thoại' value={ username } />
            <input type='password' name='password' onChange={handleChange} placeholder='Mật khẩu' value={ password } />
            <input id='submitLogin' disabled={ !(username !== "" && password !== "") } onClick={ handleLogin } type='submit' value='Đăng nhập'/>
            <p id='register' onClick={() => navigate('/signup') } >Tạo tài khoản mới</p>
            <p id='forgotPassword'>Quên mật khẩu?</p>
        </form>
    )
}
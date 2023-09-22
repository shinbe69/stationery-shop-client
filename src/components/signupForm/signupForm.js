import { useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { MessageContext } from '../login/login'

export default function SignupForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [reEnterPassword, setReEnterPassword] = useState("")
    const [message, setMessage] = useContext(MessageContext)

    //handle signup
    function handleSignup(event) {
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
            if (event.target.id === 'register') {
                if (password === reEnterPassword) {
                    fetch('/api/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({username: username, password: password, reEnterPassword: reEnterPassword})
                        }).then((response) => {
                            if (response.status === 200) {
                                navigate('/')
                            }
                            else if (response.status === 409){
                                setMessage('Tài khoản đã tồn tại trong hệ thống!')
                                showPopup()
                            }
                        })
                }
                else {
                    setMessage('Xác nhận mật khẩu không trùng khớp!')
                    showPopup()
                }
            }
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
        else {
            setReEnterPassword(event.target.value)
        }
    }

    function handleBackButton() {
        navigate('/login')
    }

    function showPopup() {
        document.getElementById('warningPopup').style.transform = 'translateY(-10vh)'
        setTimeout(() => {
            document.getElementById('warningPopup').style.transform = 'translateY(-50vh)'
        }, 2500)
    }

    return (
            <form id='signupForm' className='form'>
                <input type='text' name='username' onChange={handleChange} placeholder='Email hoặc số điện thoại' value={ username }/>
                <input type='password' name='password' onChange={handleChange} placeholder='Mật khẩu' value={ password }/>
                <input id='re-enterPassword' type='password' name='password1' onChange={handleChange} placeholder='Nhập lại mật khẩu'/>
                <input id='register' disabled={  !(username !== "" && password !== "" && reEnterPassword !== "") } onClick={ handleSignup } type='submit' value='Tạo tài khoản mới'/>
                <p id='forgotPassword'>Quên mật khẩu?</p>
                <img id='back2Login' onClick={ handleBackButton } src='back.png' alt='back'/>
            </form>
    )
}
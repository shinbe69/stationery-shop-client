import { createContext, useCallback, useState} from 'react'
import { Outlet } from 'react-router-dom'
import Popup from '../popup/popup'
import './login.css'

export const MessageContext = createContext()

export default function Login() {
    const [message, setMessage] = useState("")

    const showPopup = useCallback(() => {
            document.getElementById('warningPopup').style.transform = 'translateY(-10vh)'
            setTimeout(() => {
                document.getElementById('warningPopup').style.transform = 'translateY(-50vh)'
            }, 2500)
        }
    )

    return (
        <div id='login'>
            <Popup message={ message }/>
            <MessageContext.Provider value={ [message, setMessage] }>
                <Outlet callback={ showPopup }/>
            </MessageContext.Provider>
        </div>
    )
}
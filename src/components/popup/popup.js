import { useEffect } from 'react'
import './popup.css'

export default function Popup({ message }) {
    return (
        <div id='warningPopup'>
            <p id='popUpMessage'>{ message }</p>
        </div>
    )
}
import React from 'react'
import './Notificate.css'

const Notificate = ({ notifiClass }) => {
    return (
        <div className={`notificate ${notifiClass}`}>
            <button>Bir az gözləyin...</button>
        </div>
    )
}

export default Notificate
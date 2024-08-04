import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const MenuCompanentSecond = ({ liText, arrayOfMenuChild, setComeGo }) => {

    let pushSinif = [];

    const navigate = useNavigate()

    const callNavigate = (e) => {
        navigate(`/${e.bolum}/${e.sinif}`);

        setComeGo('');
    }

    return (
        <li>
            <NavLink>{liText}</NavLink>
            <ul>
                {
                    arrayOfMenuChild && arrayOfMenuChild.map((e) => {
                        if (!pushSinif.includes(e.sinif) && e.bolum === liText) {
                            pushSinif.push(e.sinif)
                            return < li key={e.id} > <a onClick={() => callNavigate(e)}>{e.sinif}</a></li>
                        }
                    })
                }
            </ul >
        </li >
    )
}

export default MenuCompanentSecond 
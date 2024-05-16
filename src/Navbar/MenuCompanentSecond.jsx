import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuCompanentSecond = ({ liText, arrayOfMenuChild }) => {

    let pushSinif = [];


    return (
        <li>
            <NavLink>{liText}</NavLink>
            <ul>
                {
                    arrayOfMenuChild && arrayOfMenuChild.map((e) => {
                        if (!pushSinif.includes(e.sinif)) {
                            pushSinif.push(e.sinif)
                            return < li key={e.id} > <NavLink to={'/school-shop/MyClass'}>{e.sinif}</NavLink></li>
                        }
                    })
                }
            </ul >
        </li >
    )
}

export default MenuCompanentSecond
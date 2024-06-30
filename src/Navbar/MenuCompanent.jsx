import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/mainImages/logo.png'
import { menu } from '../Data/baza';
import MenuCompanentFirst from './MenuCompanentFirst';

const MenuCompanent = () => {

    const navigate = useNavigate();

    const callNavigate = (e) => {
        navigate(`/school-shop/${e.linkOfElement}`)
    }

    return (
        <nav>
            <a href='/school-shop/'>
                <img src={logo} alt="logo" className='logo' />
            </a>
            <ul>
                <li>
                    <NavLink to='/school-shop/'>Ana Səhifə</NavLink>
                </li>
                <li style={{ display: 'none' }}>
                    <NavLink to='/school-shop/Admin'>Admin</NavLink>
                </li>
                {
                    menu && menu.map((e) => {
                        return < li key={e.id} >
                            <a onClick={() => callNavigate(e)}>{e.nameOfElement}</a>
                            <MenuCompanentFirst menuObject={e} />
                        </li>
                    })
                }
            </ul>
        </nav >
    )
}

export default MenuCompanent
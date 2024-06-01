import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import logo from '../images/mainImages/logo.png'
import { menu } from '../Data/baza';
import MenuCompanentFirst from './MenuCompanentFirst';

const MenuCompanent = () => {

    return (
        <nav>
            <a>
                <img src={logo} alt="logo" />
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
                            <NavLink to={'/school-shop/'}>{e.nameOfElement}</NavLink>
                            <MenuCompanentFirst menuObject={e} />
                        </li>
                    })
                }
            </ul>
        </nav >
    )
}

export default MenuCompanent
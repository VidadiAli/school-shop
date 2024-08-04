import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/mainImages/logo.png'
import { menu } from '../Data/baza';
import MenuCompanentFirst from './MenuCompanentFirst';
import { CiMenuFries } from "react-icons/ci";

const MenuCompanent = () => {

    const [comeGo, setComeGo] = useState('');

    const navigate = useNavigate();

    const callNavigate = (e) => {
        if (window.innerWidth >= 1050) {
            navigate(`/${e.linkOfElement}`);
        }
    }


    const callMenu = () => {
        if (comeGo == '') {
            setComeGo('come-go')
        }
        else {
            setComeGo('')
        }
    }

    return (
        <nav>
            <a href='/' className='logo'>
                <img src={logo} alt="logo" />
            </a>
            <ul className={`${comeGo}`}>
                <li>
                    <NavLink to='/'>Ana Səhifə</NavLink>
                </li>
                <li style={{ display: 'none' }}>
                    <NavLink to='/Admin'>Admin</NavLink>
                </li>
                {
                    menu && menu.map((e) => {
                        return < li key={e.id} >
                            <a onClick={() => callNavigate(e)}>{e.nameOfElement}</a>
                            <MenuCompanentFirst menuObject={e} setComeGo={setComeGo} />
                        </li>
                    })
                }
            </ul>
            {
                window.innerWidth <= 1050 ? <CiMenuFries className='menu-icon' onClick={callMenu} /> : ''
            }
        </nav >
    )
}

export default MenuCompanent
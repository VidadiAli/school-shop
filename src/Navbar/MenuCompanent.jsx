import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import logo from '../images/mainImages/logo.png'
import { mainData } from '../Data/data';
import MenuCompanentFirst from './MenuCompanentFirst';

const MenuCompanent = () => {

    const [newData, setNewData] = useState([]);

    const getData = async (url) => {
        const arrayOfMenu = (await axios.get(url)).data;
        setNewData(arrayOfMenu);
    }

    useEffect(() => {
        getData(`${mainData}menu`);
    }, [])

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
                    newData && newData.map((e) => {
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
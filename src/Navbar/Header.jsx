import React from 'react'
import './Header.css'
import MenuCompanent from './MenuCompanent'
import SearchCompanent from './SearchCompanent'


const Header = () => {
    return (
        <header>
            <MenuCompanent />
            <SearchCompanent />
        </header>
    )
}

export default Header
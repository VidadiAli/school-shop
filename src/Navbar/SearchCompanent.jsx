import React from 'react'
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";

const SearchCompanent = () => {
    return (
        <div className='sosial-menu'>
            <form>
                <input type="search" placeholder='Bir şey axtar' />
                <div>
                    <CiSearch />
                </div>
            </form>
            <div className="sosial">
                <a href="tel:+994774501546"><MdOutlineLocalPhone /></a>
                <a href="https://www.instagram.com/ramana.kitab.evi/"><FaInstagram /></a>
                <a href=""><FaRegEnvelope /></a>
                <a href="https://maps.app.goo.gl/5YADvB2rxQuTVuEWA">
                    <i class='bx bxs-map'></i>
                    <span style={{ padding: '0 10px' }}>unvan</span>
                </a>
            </div>
        </div >
    )
}

export default SearchCompanent
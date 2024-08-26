import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import SearchingElements from './SearchingElements';
import { menu } from '../Data/baza';
import { mainData } from '../Data/data';
import axios from 'axios';

const SearchComponent = () => {

    const [search, setSearch] = useState(false);
    const [searchArray, setSearchArray] = useState([]);
    const [searchedArray, setSearchedArray] = useState([]);

    const callData = async (jsonFile) => {
        try {
            const mainArray = (await axios.get(`${mainData}getbook${jsonFile}`)).data;
            setSearchArray(prevArray => [...prevArray, ...mainArray]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        setSearchArray([]);
        menu.forEach((e) => {
            callData(e.jsonFile);
        });
    }, []);

    const searchingElements = (e) => {
        const inputValue = e.target.value;
        let searchList = [];
        let filteredArray = [];

        searchArray.forEach((element) => {
            if (element.elementinAdi.toUpperCase().includes(inputValue.toUpperCase())) {
                if (!searchList.includes(element.elementinAdi)) {
                    searchList.push(element.elementinAdi);
                    filteredArray.push(element);
                }
            }
        });

        setSearchedArray(filteredArray);
        setSearch(filteredArray.length > 0);
    }

    return (
        <div className='sosial-menu'>
            <form>
                <input style={{ textTransform: 'uppercase' }}
                    type="search"
                    placeholder='Bir şey axtar'
                    onChange={searchingElements} // onKeyDown yerine onChange kullandık
                    className='search-box'
                />
                <div>
                    <CiSearch />
                </div>
            </form>
            {
                search ? <SearchingElements searchedArray={searchedArray} setSearch={setSearch} /> : ''
            }
            <div className="sosial">
                <a href="tel:+994774501546"><MdOutlineLocalPhone /></a>
                <a href="https://www.instagram.com/ramana.kitab.evi/" target='_blank'><FaInstagram /></a>
                <a href="mailto:elton.cabbarli22@gmail.com"><FaRegEnvelope /></a>
                <a href="https://www.google.com/maps?q=40.4782826,50.0134644&z=17&hl=en" target='_blank'>
                    <i className='bx bxs-map'></i>
                </a>
            </div>
        </div>
    );
}

export default SearchComponent;

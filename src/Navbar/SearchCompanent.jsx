import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import SearchingElements from './SearchingElements';
import { menu } from '../Data/baza';
import { mainData } from '../Data/data';
import axios from 'axios';

const SearchCompanent = () => {

    const [search, setSearch] = useState(false);
    const [searchArray, setSearchArray] = useState([]);
    const [searchedArray, setSearchedArray] = useState([])

    const callData = async (jsonFile) => {
        try {
            const mainArray = (await axios.get(`${mainData}read${jsonFile}`)).data;
            setSearchArray(prevArray => [...prevArray, ...mainArray]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        setSearchArray([])
        menu.forEach((e) => {
            callData(e.jsonFile);
        });
    }, []); // Asılılıqlar siyahısına bolum və sinif əlavə olundu

    const searchingElements = ()=>{
        let searchList = [];
        const inputValue = document.getElementsByClassName('search-box')[0];
        searchArray.forEach((e)=>{
            if(e.elementinAdi.toUpperCase().includes(inputValue.value.toUpperCase())){
                if(!searchList.includes(e.elementinAdi)){
                    searchList.push(e.elementinAdi);

                    searchedArray.push(e);
                    setSearchedArray(searchedArray);
                    setSearch(true);
                }
            }
            else{
                setSearchedArray([]);
                setSearch(false)
            }
        })
    }

    return (
        <div className='sosial-menu' >
            <form >
                <input type="search" placeholder='Bir şey axtar' onKeyDown={searchingElements} className='search-box' />
                <div>
                    <CiSearch />
                </div>
            </form>
            {
                search ? <SearchingElements  searchedArray = {searchedArray} setSearch = {setSearch}/> : ''
            }
            <div className="sosial">
                <a href="tel:+994774501546"><MdOutlineLocalPhone /></a>
                <a href="https://www.instagram.com/ramana.kitab.evi/"><FaInstagram /></a>
                <a href=""><FaRegEnvelope /></a>
                <a href="https://maps.app.goo.gl/5YADvB2rxQuTVuEWA" target='_blank'>
                    <i className='bx bxs-map'></i>
                </a>
            </div>
        </div >
    )
}

export default SearchCompanent
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


    const searchArea = document.getElementsByClassName('search-area')[0], searchBox = document.getElementsByClassName('search-box')[0];

    let arrayOfSearch = [];
    const searchingElements = () => {
        setSearch(true);
        let countOfSearchElement = 0;
        arrayOfSearch = [];
        searchArray.forEach((e) => {
            if ((((e.elementinAdi + e.sinif).toUpperCase()).trim()).includes((searchBox.value.toUpperCase()).trim())) {
                if (!arrayOfSearch.includes((e.elementinAdi + e.sinif).toUpperCase())) {
                    const searchElementBox = document.createElement('div');

                    //console.log((e.elementinAdi + e.sinif).toUpperCase() + " * " + searchBox.value.toUpperCase());
                    const searchBoxCover = document.createElement('img');
                    searchBoxCover.setAttribute('src', e.elementinShekli);
                    const searchBoxHead = document.createElement('h3');
                    searchBoxHead.textContent = e.elementinAdi;
                    const searchBoxClass = document.createElement('span');
                    searchBoxClass.textContent = e.sinif;

                    const nowBuy = document.createElement('button');
                    nowBuy.textContent = 'indi sifarish et'

                    searchElementBox.append(searchBoxCover, searchBoxHead, searchBoxClass, nowBuy);

                    searchArea.append(searchElementBox);

                    arrayOfSearch.push((e.elementinAdi + e.sinif).toUpperCase());

                    countOfSearchElement++;
                }
            }
        });

        if (countOfSearchElement === 0) {

            const noElement = document.createElement('span');
            noElement.textContent = 'Axtardığınız obyekt stokda yoxdur :(';
            const closeArea = document.createElement('i');
            closeArea.className = 'bx bx-x';

            searchArea.append(noElement, closeArea);

            closeArea.addEventListener('click', () => {
                searchArea.remove();
            });

        }
    }


    return (
        <div className='sosial-menu'>
            <form>
                <input type="search" placeholder='Bir şey axtar' onKeyDown={searchingElements} className='search-box' />
                <div>
                    <CiSearch />
                </div>
            </form>
            {
                search ? <SearchingElements /> : ''
            }
            <div className="sosial">
                <a href="tel:+994774501546"><MdOutlineLocalPhone /></a>
                <a href="https://www.instagram.com/ramana.kitab.evi/"><FaInstagram /></a>
                <a href=""><FaRegEnvelope /></a>
                <a href="https://maps.app.goo.gl/5YADvB2rxQuTVuEWA" target='_blank'>
                    <i class='bx bxs-map'></i>
                </a>
            </div>
        </div >
    )
}

export default SearchCompanent
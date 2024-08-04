import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { menu } from '../Data/baza';
import { mainData } from '../Data/data';
import './HomeElements.css'
import back from '../images/mainImages/back.jpg'
import { NavLink, useNavigate } from 'react-router-dom';

const HomeElements = () => {
    const navigate = useNavigate();

    const [arrayOfMenuChild, setArrayOfMenuChild] = useState([]);

    const getData = async (url) => {
        const response = await axios.get(url);
        return response.data;
    }


    const callNavigate = (e) => {
        navigate(`/${e.linkOfElement}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            const results = await Promise.all(
                menu.map(e => getData(`${mainData}getbook${e.jsonFile}`))
            );
            const mergedData = results.flat();
            setArrayOfMenuChild(mergedData);
        };

        fetchData();
    }, [menu, mainData]);


    // let elementCount = 2;
    // if (window.innerWidth < 1300 && innerWidth >= 850) elementCount = 5
    // else if (window.innerWidth < 850 && innerWidth >= 600) elementCount = 4
    // else if (window.innerWidth < 600) elementCount = 3;


    return (
        <div className='third-element'>
            {/* <img src={back} alt={back} className='back-fone' /> */}
            {menu.map((e) => {
                return (
                    <div key={e.id}>
                        <div className='box-of-head'>
                            <h2>{e.nameOfElement}</h2>
                            <a onClick={() => callNavigate(e)} style={{ cursor: 'pointer' }}>Hamısına Bax ...</a>
                        </div>

                        <div className='elements-of-boxes'>
                            {arrayOfMenuChild.map((f) => {
                                if (e.jsonFile === f.mainSection) {
                                    return (
                                        <div key={f.id}>
                                            <small>Çatdırılma var</small>
                                            <img src={f.elementinShekli} alt={f.elementinShekli} />
                                            <h4>{f.elementinAdi}</h4>
                                            <span>{f.elementinQiymeti} ₼</span>
                                            <button>İndi sifariş et</button>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default HomeElements;

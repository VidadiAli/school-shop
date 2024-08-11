import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { menu } from '../Data/baza';
import { mainData } from '../Data/data';
import './HomeElements.css'
import back from '../images/mainImages/back.jpg'
import { NavLink, useNavigate } from 'react-router-dom';
import Notificate from '../Notificate/Notificate';

const HomeElements = () => {
    const navigate = useNavigate();

    const [arrayOfMenuChild, setArrayOfMenuChild] = useState([]);
    const [sliceNumber, setSliceNumber] = useState(5);
    const [notificateOnOff, setNotificateOnOff] = useState('')

    const getData = async (url) => {

        const response = await axios.get(url);
        setNotificateOnOff('notificate-off');
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



    useEffect(() => {
        if (window.innerWidth < 1300 && innerWidth >= 600) setSliceNumber(4);
        else if (window.innerWidth < 600) setSliceNumber(3);
    }, [])


    return (
        <div className='third-element'>

            <Notificate notifiClass={notificateOnOff} />

            {menu.map((e) => {
                return (
                    <div key={e.id} className='elements-back'>
                        <div className='box-of-head'>
                            <h2>{e.nameOfElement}</h2>
                            <a onClick={() => callNavigate(e)} style={{ cursor: 'pointer' }}>Hamısına Bax ...</a>
                        </div>

                        <div className='elements-of-boxes'>
                            {arrayOfMenuChild.slice(0, sliceNumber).map((f) => {
                                if (e.jsonFile === f.mainSection) {
                                    return (
                                        <div key={f.id} className='box'>
                                            <small>Çatdırılma var</small>
                                            <img src={f.elementinShekli} alt={f.elementinShekli} />
                                            <h4>{f.elementinAdi}</h4>
                                            <span>{f.elementinQiymeti} ₼</span>
                                            <a href="https://wa.me/+994774501546" target='_blank' rel="noopener noreferrer">Sifariş et</a>
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

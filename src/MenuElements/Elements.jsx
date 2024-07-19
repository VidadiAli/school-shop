import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { menu } from '../Data/baza';
import { mainData } from '../Data/data';
import './Elements.css'

const Elements = () => {
    const [mainArray, setMainArray] = useState([]);
    const { linkOfElement } = useParams();

    const callData = async (url) => {
        const data = await (await axios.get(`${mainData}read${url}`)).data;
        setMainArray(data);
    };

    useEffect(() => {
        menu.forEach((e) => {
            if (linkOfElement === e.linkOfElement) {
                callData(e.jsonFile);
            }
        });
    }, [linkOfElement]); // Asılılıqlar siyahısına linkOfElement əlavə olundu

    return (
        <div className='elements'>
            {mainArray.map((e) => {
                return (
                    <div key={e.id}>
                        <img src={e.elementinShekli} alt={e.elementinShekli} />
                        <h4>{e.elementinAdi}</h4>
                        <span>{e.elementinQiymeti} ₼</span>
                        <a href="https://wa.me/+994774501546" target='_blank' rel="noopener noreferrer">Sifariş et</a>
                    </div>
                );
            })}
        </div>
    );
};

export default Elements;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mainData } from '../Data/data';
import { menu } from '../Data/baza';
import './MyClass.css';

const MyClass = () => {
    const [navigateArray, setNavigateArray] = useState([]);
    const { bolum, sinif } = useParams();

    const callData = async (jsonFile) => {
        try {
            const mainArray = (await axios.get(`${mainData}read${jsonFile}`)).data;
            setNavigateArray(prevArray => [...prevArray, ...mainArray]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        setNavigateArray([])
        menu.forEach((e) => {
            callData(e.jsonFile);
        });
    }, [bolum, sinif]); // Asılılıqlar siyahısına bolum və sinif əlavə olundu

    return (
        <div className='my-class'>
            {navigateArray.map((e) => {
                if (e.bolum === bolum && e.sinif == sinif) {
                    return (
                        <div key={e.id}>
                            <img src={e.elementinShekli} alt={`${e.elementinShekli}`} />
                            <span>son {e.elementinSayi} ədəd</span>
                            <span>{e.elementinAdi}</span>
                            <span>sinif: {e.sinif}</span>
                            <span>{e.elementinQiymeti} ₼</span>
                            <a href="https://wa.me/+994774501546" target='_blank' rel="noopener noreferrer">Sifariş et</a>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default MyClass;

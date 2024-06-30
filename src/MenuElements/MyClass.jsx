import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { mainData } from '../Data/data';
import { menu } from '../Data/baza';
import './MyClass.css'

const MyClass = () => {
    const [navigateArray, setNavigateArray] = useState([])
    const { bolum, sinif } = useParams();

    const callData = async (jsonFile) => {
        const mainArray = (await axios.get(`${mainData}read${jsonFile}`)).data;
        mainArray.forEach((e) => {
            navigateArray.push(e);
        });
        setNavigateArray(navigateArray)
    }


    useEffect(() => {
        menu && menu.forEach((e) => {
            callData(e.jsonFile)
        })
    }, [])

    return (
        <div className='my-class'>
            {
                navigateArray && navigateArray.map((e) => {
                    if (e.bolum === bolum && e.sinif == sinif) {
                        return <div key={e.id}>
                            <img src={e.elementinShekli} alt={`${e.elementinShekli}`} />
                            <span>son {e.elementinSayi} ədəd</span>
                            <span>{e.elementinAdi}</span>
                            <span>sinif: {e.sinif}</span>
                            <span>{e.elementinQiymeti} ₼</span>
                            <a href="https://wa.me/+994774501546" target='_blank'>Sifariş et</a>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default MyClass
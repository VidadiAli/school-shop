import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainData } from '../Data/data'
import MenuCompanentSecond from './MenuCompanentSecond';


const MenuCompanentFirst = ({ menuObject, setComeGo }) => {

    const [arrayOfMenuChild, setArrayOfMenuChild] = useState([]);
    const [secondUl, setSecondUl] = useState('');

    const getData = async (url) => {
        const bolum = (await axios.get(url)).data;
        setArrayOfMenuChild(bolum);
    }


    useEffect(() => {
        getData(`${mainData}getbook${menuObject.jsonFile}`)
    }, [])

    let pushBolum = [];


    useEffect(() => {
        if (pushBolum.length > 10 && window.innerWidth > 1050) {
            setSecondUl('second-ul');
        }
    }, [pushBolum]);

    return (
        <ul className={`${secondUl}`}>
            {
                arrayOfMenuChild && arrayOfMenuChild.map((e) => {
                    if (!pushBolum.includes(e.bolum)) {
                        pushBolum.push(e.bolum);
                        return < MenuCompanentSecond key={e.id} liText={e.bolum} arrayOfMenuChild={arrayOfMenuChild} setComeGo={setComeGo} />
                    }
                })
            }
        </ul>
    )
}

export default MenuCompanentFirst
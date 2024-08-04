import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainData } from '../Data/data'
import MenuCompanentSecond from './MenuCompanentSecond';


const MenuCompanentFirst = ({ menuObject, setComeGo }) => {

    const [arrayOfMenuChild, setArrayOfMenuChild] = useState([]);

    const getData = async (url) => {
        const bolum = (await axios.get(url)).data;
        setArrayOfMenuChild(bolum);
    }


    useEffect(() => {
        getData(`${mainData}getbook${menuObject.jsonFile}`)
    }, [])

    let pushBolum = [];

    return (
        <ul>
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
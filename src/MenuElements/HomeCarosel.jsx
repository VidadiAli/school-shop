import React, { useEffect } from 'react'
import { menu } from '../Data/baza'
import './HomeCarosel.css'
import back from '../images/mainImages/back.jpg'
import carosel1 from '../images/mainImages/carosel1.jpg'
import carosel2 from '../images/mainImages/carosel2.jpg'
import carosel3 from '../images/mainImages/carosel3.jpg'
import carosel4 from '../images/mainImages/carosel4.jpg'
import { useNavigate } from 'react-router-dom'

const HomeCarosel = () => {

    const caroselImages = [carosel1, carosel2, carosel3, carosel4], navigate = useNavigate();
    let countOfCarosel = 0;

    const mainPageElement = document.getElementsByClassName('main-page-element');

    let arrayOfRight = [], startOfArray = -100;

    const callCaroselStyle = () => {
        for (let i in menu) {
            arrayOfRight.push(startOfArray);
            startOfArray = startOfArray + 100;
            if (startOfArray === (menu.length - 1) * 100) {
                startOfArray = -100;
            }
        }
    }

    const callInterval = () => {
        for (let i in menu) {
            mainPageElement[i].style.right = arrayOfRight[i] + '%';
            if (arrayOfRight[i] === 200) {
                mainPageElement[i].style.display = 'none';
            }
            else if (arrayOfRight[i] === -100) {
                mainPageElement[i].style.display = 'flex';
            }
        }
        startOfArray = arrayOfRight[1];
        arrayOfRight = [];
        callCaroselStyle();
    }

    let caroselInterval;


    useEffect(() => {
        callCaroselStyle();
    }, [])


    useEffect(() => {
        caroselInterval = setInterval(callInterval, 3000);
        return () => clearInterval(caroselInterval);
    })

    const callNavigate = (e) => {
        navigate(`/${e.linkOfElement}`)
    }

    return (
        <div className='first-element'>
            {
                menu.map((e) => {
                    { countOfCarosel++ }
                    return <div className='main-page-element' key={e.id}>
                        <img src={caroselImages[countOfCarosel - 1]} alt={e.caroselCover} />
                        <div>
                            <h2>{e.nameOfElement}</h2>
                            <i className={e.iconOfElement}></i>
                            <a onClick={() => callNavigate(e)} style={{ cursor: 'pointer' }}>Ətraflı</a>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default HomeCarosel
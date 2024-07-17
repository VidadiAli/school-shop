import React from 'react'
import HomeCarosel from './HomeCarosel'
import HomeElements from './HomeElements'
import './Home.css'

const Home = () => {
    return (
        <div className='main-page'>
            <HomeCarosel />
            <HomeElements />
            <div className='map-of-element'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d8289.714398828944!2d49.851175751407986!3d40.42730870791979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDI1JzMzLjkiTiA0OcKwNTEnMTUuMiJF!5e0!3m2!1str!2saz!4v1719683478095!5m2!1str!2saz" width="600" height="450" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default Home
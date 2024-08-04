import React from 'react'
import './SearchingElements.css'
import { useNavigate } from 'react-router-dom'

const SearchingElements = ({ searchedArray, setSearch }) => {

    const navigate = useNavigate();

    const goElement = (e) => {
        navigate(`/${e.bolum}/${e.sinif}`);
        setSearch(false);
    }

    const closeArea = () => {
        setSearch(false);
    }

    return (
        <div className='search-area'>
            <div className='close-area'>
                <span onClick={closeArea}>close</span>
            </div>
            <div className='main-area'>
                {
                    searchedArray.map((e) => (
                        <div key={e.id} onClick={() => goElement(e)}>
                            <img src={e.elementinShekli} alt={`photo of ${e.elementinAdi}`} />
                            <span>{e.elementinAdi}</span>
                            <span>{e.elementinQiymeti} ₼</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchingElements
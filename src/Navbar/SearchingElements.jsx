import React from 'react'
import './SearchingElements.css'
import { useNavigate } from 'react-router-dom'

const SearchingElements = ({searchedArray, setSearch}) => {
   
    const navigate = useNavigate();

    const goElement = (e)=>{
        navigate(`/school-shop/${e.bolum}/${e.sinif}`);
        setSearch(false);
    }

    return (
        <div className='search-area'>
            {
                searchedArray.map((e) => (
                    <div key={e.id} onClick={()=>goElement(e)}>
                        <img src={e.elementinShekli} alt={`photo of ${e.elementinAdi}`} />
                        <span>{e.elementinAdi}</span>
                        <span>{e.elementinQiymeti} ₼</span>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchingElements
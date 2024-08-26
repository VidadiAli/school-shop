import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='first-box'>
                <h1>Bizi İzlə</h1>
                <ul>
                    <li><a href="https://www.instagram.com/ramana.kitab.evi/" target='_blank'><FaInstagram /> <span>instagram</span></a></li>
                </ul>
            </div>

            <div className='second-box'>
                <h1>Haqqımızda</h1>
                <div>
                    <span>Məktəbli arzuların var?</span>
                    <span>Ali məktəbə hazırlaşırsan?</span>
                    <span>Övladını təhsili səni yaxından maraqlandırır?</span>

                    <p>
                        O zaman doğru ünvandasan. Arzularını biz sənə daha yaxın etdim. Gecikmə elə indi gəl və hər çeşidlə zənginlənmiş mallarımızdan al və götür.

                    </p>
                </div>
            </div>

            <div className='third-box'>
                <h1>Bir sualın varsa, çəkinmədən yaz!</h1>
                <a href="https://wa.me/+994774501546" target='_blank' rel="noopener noreferrer"><FaWhatsapp className='wp-icon' /><span>WhatsApp xəttimiz</span></a>
            </div>
        </div>
    )
}

export default Footer
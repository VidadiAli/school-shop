import React, { useEffect, useState } from 'react'
import './AdminPanel.css'
import axios from 'axios'
import { mainData } from '../Data/data'
import { IoMdCloseCircle } from "react-icons/io";




const AdminPanel = () => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [removeForm, setRemoveForm] = useState('')
    const [selectClass, setSelectClass] = useState('');
    const [addAdminArea, setAddAdminArea] = useState('')

    const [menuData, setMenuData] = useState([]);
    const [selectElement, setSelectElement] = useState('Dərs Ləvazimatları');
    const [jsonUrl, setJsonUrl] = useState('dersLevazimatlari');


    const callJson = (deyer) => {
        menuData.forEach((element) => {
            if (element.nameOfElement === deyer) {
                setJsonUrl(element.jsonFile);
                setSelectElement(element.nameOfElement);
            }
        })
    }


    const callMenu = async (url) => {
        const arrayOfMenu = (await axios.get(url)).data;
        setMenuData(arrayOfMenu);
    }



    const callAccount = async () => {
        const accountElements = (await axios.get(`${mainData}myAccount`)).data;
        setUser(accountElements[0].userBaza);
        setPassword(accountElements[0].passwordBaza);
    }



    useEffect(() => {
        callMenu(`${mainData}menu`);
        callAccount();
        callJson();
    })



    const enterAccount = () => {

        const userId = document.getElementById('userId'),
            passwordId = document.getElementById('passwordId');

        if (user === userId.value.trim() && password === passwordId.value.trim()) {
            setAddAdminArea('admin-area')
            setRemoveForm('form-remove');
        }
        else {
            alert('Məlumatlar doğru deyil');
            return;
        }
    }



    const callPostMetod = async (url, element) => {
        await axios.post(url, element)
    }



    const addElement = () => {
        setSelectClass('form-main');
    }



    const callMenuSend = () => {

        const menuSection = document.getElementById('section'), menuClass = document.getElementById('class'), menuElementName = document.getElementById('nameOfO'), menuPrice = document.getElementById('price'), menuCount = document.getElementById('count');


        const element1 = {
            "bolumunAdi": selectElement,
            "bolum": menuSection.value,
            "sinif": menuClass.value,
            "elementinAdi": menuElementName.value,
            "elementinQiymeti": menuPrice.value,
            "elementinShekli": "dersLevazimatlari/1.jpg",
            "say": menuCount.value
        }

        callPostMetod(`${mainData}${jsonUrl}`, element1);
        setSelectClass('');

    }

    const closeForm = () => {
        setSelectClass('');
    }


    const changeAccountFromBaza = async (newUser, newParol) => {
        const updateElement = {
            "id": "1",
            "userBaza": newUser,
            "passwordBaza": newParol
        }

        await axios.put(`${mainData}myAccount/${1}`, updateElement);
    }


    let result = false;
    const changeAccount = () => {
        while (!result) {
            const lastUser = prompt('öncəki user adını daxil et: ');
            const lastParol = prompt('öncəki parolu daxil et: ');
            if (user === lastUser && password === lastParol) {
                const newUser = prompt('yeni user adını daxil et: ');
                const newParol = prompt('yeni parolu daxil et: ');
                if (newUser.trim() != '' && newParol.trim() != '') {
                    result = confirm(`yenu user: ${newUser}\nyeni parol: ${newParol}\nDəyişiklik etməyə əminsiz?`);
                    if (result) {
                        changeAccountFromBaza(newUser, newParol);
                        alert('Məlumatlarınız uğurla yeniləndi!');
                    }
                    else {
                        const newResult = confirm('Dəyişikliyə davam etmək istəyirsiz?');
                        if (newResult) {
                            result = false
                        }
                        else {
                            result = true;
                        }
                    }
                }
                else {
                    alert('Boş saxlaya bilməzsiniz!');
                    return;
                }
            }
            else {
                alert('Doğru daxil etmədiniz');
                return;
            }
        }
    }



    return (
        <div className='admin-panel'>
            <form className={`${removeForm}`}>
                <input type="text" placeholder='user: ' id='userId' />
                <input type="password" placeholder='password: ' id='passwordId' />
                <input type="button" value="Daxil ol" onClick={enterAccount} />
            </form>

            <div className={`admin-area-remove ${addAdminArea}`} >
                <h2>Xoş Gəldin: Elton Cabbarlı</h2>
                <div>
                    <button onClick={addElement}>Element Əlavə et</button>
                    <button>Elementi Sil</button>
                    <button>Element üzərində dəyişiklik et</button>
                </div>
                <a className='changeInform' onClick={changeAccount}>Parol və User adlarını dəyiş</a>
            </div>

            <div className={`form-main-remote ${selectClass}`}>
                <IoMdCloseCircle onClick={closeForm} />
                <form>
                    <select onChange={(e) => {
                        callJson(e.target.value);
                    }}>
                        {
                            menuData && menuData.map((f) => (
                                <option key={f.id} value={f.nameOfElement} option='true'>{f.nameOfElement}</option>
                            ))
                        }
                    </select>
                    <input type="text" placeholder='Bölüm adını qeyd et:' id='section' />
                    <input type="text" placeholder='Sinfi qeyd et:' id='class' />
                    <input type="text" placeholder='Obyektin adını qeyd et:' id='nameOfO' />
                    <input type="text" placeholder='Obyektin qiymətini qeyd et:' id='price' />
                    <input type="text" placeholder='Obyektin sayını qeyd et:' id='count' />
                    <input type="button" value="Əlavə et" onClick={callMenuSend} />
                </form>
            </div >
        </div >
    )
}

export default AdminPanel
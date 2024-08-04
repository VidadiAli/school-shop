import React, { useEffect, useState } from 'react'
import './AdminPanel.css'
import axios from 'axios'
import { mainData } from '../Data/data'
import { IoMdCloseCircle } from "react-icons/io";
import { menu } from '../Data/baza';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from '../uploadImage/Config';
import { v4 } from 'uuid';




const AdminPanel = () => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [removeForm, setRemoveForm] = useState('');
    const [removeCreateForm, setCreateRemoveForm] = useState('');
    const [selectClass, setSelectClass] = useState('e');
    const [addAdminArea, setAddAdminArea] = useState('')
    //const [selectElement, setSelectElement] = useState('Dərs Ləvazimatları');
    const [jsonUrl, setJsonUrl] = useState('Levazimatlar');
    const [imageUrl, setImageUrl] = useState();

    const callJson = (deyer) => {
        menu.forEach((element) => {
            if (element.nameOfElement === deyer) {
                setJsonUrl(element.jsonFile);
                //setSelectElement(element.nameOfElement);
            }
        })
    }



    const callAccount = async () => {
        const accountElements = (await axios.get(`${mainData}readAccount`)).data;
        document.getElementsByClassName('waiting-open')[0].classList.add('waiting-stop');

        if (accountElements.length != 0) {
            setUser(accountElements[0].user);
            setPassword(accountElements[0].password);
            if (document.getElementById('adminArea').getAttribute('class') !== "admin-area-remove admin-area") {
                setCreateRemoveForm('');
                setRemoveForm('form-remove');
            }

        }
        else {
            setCreateRemoveForm('form-remove');
            setRemoveForm('');
        }
    }



    useEffect(() => {
        callAccount();
        callJson();
    })


    const createAccount = async () => {
        const userId = document.getElementById('userCreatingId'),
            passwordId = document.getElementById('passwordCreatingId');
        if (userId.value.trim() != '' && passwordId.value.trim() != '') {
            const updateElement = {
                "id": "1",
                "user": userId.value,
                "password": passwordId.value
            }

            await axios.post(`${mainData}createAccount`, updateElement);

            alert('Hesabınız uğurlar yaradıldı');
            setCreateRemoveForm('');
            setRemoveForm('form-remove');
            userId.value = ''
            passwordId.value = ''
        }
    }



    const addElement = () => {
        setSelectClass('form-main');
    }


    const uploadCover = (e) => {
        const imgRef = ref(imageDb, `${jsonUrl}/${v4()}`);
        uploadBytes(imgRef, e.target.files[0]).then((value) => {
            getDownloadURL(value.ref).then((url) => {
                setImageUrl(url);
            })
        })
    }


    const callMenuSend = async () => {
        if (imageUrl != 'undefined' && imageUrl != '') {
            const menuSection = document.getElementById('section'), menuClass = document.getElementById('class'), menuElementName = document.getElementById('nameOfO'), menuPrice = document.getElementById('price'), menuCount = document.getElementById('count');

            if (menuSection.value.trim() != '' && menuClass.value.trim() != '' && menuElementName.value.trim() != '' && menuPrice.value.trim() != '' && menuCount.value.trim() != '') {
                const element1 = {
                    "id": imageUrl.slice(imageUrl.length - 36, imageUrl.length),
                    "mainSection": jsonUrl,
                    "bolum": menuSection.value,
                    "sinif": menuClass.value,
                    "elementinAdi": menuElementName.value,
                    "elementinQiymeti": menuPrice.value,
                    "elementinShekli": imageUrl,
                    "elementinSayi": menuCount.value
                }


                console.log(element1)
                await axios.post(`${mainData}postbook${jsonUrl}`, element1);
                setSelectClass('');
                setImageUrl('');
                menuSection.value = '', menuClass.value = '', menuElementName.value = '', menuPrice.value = '', menuCount.value = ''
            }
            else {
                alert("Məlumatları tam doldurun!");
            }
        }
        else {
            alert('Bir problem yaşandı "Əlavə et" düyməsinə yenidən klikləyin');
        }
    }


    const closeForm = () => {
        setSelectClass('');
    }


    const changeAccountFromBaza = async (newUser, newParol) => {
        const updateElement = {
            "id": "1",
            "user": newUser,
            "password": newParol
        }

        await axios.put(`${mainData}updateAccount/1`, updateElement);
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


    const enterAccount = () => {

        const userId = document.getElementById('userId'),
            passwordId = document.getElementById('passwordId');

        if (user === userId.value.trim() && password === passwordId.value.trim()) {
            setAddAdminArea('admin-area');
            setRemoveForm('');
        }
        else {
            alert('Məlumatlar doğru deyil');
            return;
        }
    }

    return (
        <div className='admin-panel'>
            <div className={`waiting-open`}>
                <button>Bir az gözləyin...</button>
            </div>
            <form className={`${removeForm}`}>
                <input type="text" placeholder='user: ' id='userId' />
                <input type="password" placeholder='password: ' id='passwordId' />
                <input type="button" value="Daxil ol" onClick={enterAccount} />
            </form>

            <form className={`${removeCreateForm}`}>
                <input type="text" placeholder='user: ' id='userCreatingId' />
                <input type="password" placeholder='password: ' id='passwordCreatingId' />
                <input type="button" value="user və parol yarat" onClick={createAccount} />
            </form>

            <div className={`admin-area-remove ${addAdminArea}`} id='adminArea' >
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
                        <option value="choose">Menu seç</option>
                        {
                            menu && menu.map((f) => (
                                <option key={f.id} value={f.nameOfElement} option='true'>{f.nameOfElement}</option>
                            ))
                        }
                    </select>
                    <input type="text" placeholder='Bölüm adını qeyd et:' id='section' />
                    <input type="text" placeholder='Sinfi qeyd et:' id='class' />
                    <input type="text" placeholder='Obyektin adını qeyd et:' id='nameOfO' />
                    <input type="text" placeholder='Obyektin qiymətini qeyd et:' id='price' />
                    <input type="file" onChange={(e) => uploadCover(e)} />
                    <input type="text" placeholder='Obyektin sayını qeyd et:' id='count' />
                    <input type="button" value="Əlavə et" onClick={callMenuSend} />
                </form>
            </div >
        </div >
    )
}

export default AdminPanel
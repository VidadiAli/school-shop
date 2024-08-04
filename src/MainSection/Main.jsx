import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../MenuElements/Home'
import AdminPanel from '../AdminPanel/AdminPanel'
import MyClass from '../MenuElements/MyClass'
import Elements from '../MenuElements/Elements'

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:bolum/:sinif' element={<MyClass />} />
                <Route path='/:linkOfElement' element={<Elements />} />
                <Route path='/Admin' element={<AdminPanel />} />
            </Routes>
        </main>
    )
}

export default Main
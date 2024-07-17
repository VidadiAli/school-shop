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
                <Route path='/school-shop/' element={<Home />} />
                <Route path='/school-shop/:bolum/:sinif' element={<MyClass />} />
                <Route path='/school-shop/:linkOfElement' element={<Elements />} />
                <Route path='/school-shop/Admin' element={<AdminPanel />} />
            </Routes>
        </main>
    )
}

export default Main
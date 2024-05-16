import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../MenuElements/Home'
import AdminPanel from '../AdminPanel/AdminPanel'
import MyClass from '../MenuElements/MyClass'

const Main = () => {
    return (
        <main>
            <Routes >
                <Route path='/school-shop/' element={<Home />} />
                <Route path='/school-shop/MyClass' element={<MyClass />} />
                <Route path='/school-shop/Admin' element={<AdminPanel />} />
            </Routes>

        </main>
    )
}

export default Main
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../MenuElements/Home'
import MyClass from '../MenuElements/MyClass'
import Elements from '../MenuElements/Elements'

const Main = () => {
    return (
        <main>
            <Routes basename="/qesebekitabevi.com">
                <Route path='/' element={<Home />} />
                <Route path='/:bolum/:sinif' element={<MyClass />} />
                <Route path='/:linkOfElement' element={<Elements />} />
            </Routes>
        </main>
    )
}

export default Main
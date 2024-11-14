import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Main({ifUserLogin , remove ,}) {


return <>

    <Navbar ifUserLogin={ifUserLogin} remove ={remove} />
    <Outlet/>

</>
}

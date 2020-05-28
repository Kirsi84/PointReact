import React from 'react'
import Navigation from './Navigation'
import {Link} from 'react-router-dom'

function Header(){
    return (
        <header className="bg-black border-b p-3 flex justify-between items-center fixed w-full">
            <Link to="/" className="font-bold text-white">

                PointApp
                
            </Link>

            <Navigation />
        </header>
    )
}

export default Header
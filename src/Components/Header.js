import React from 'react'
import Navigation from './Navigation'
import {Link} from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'

function Header(){
    return (
        <header className="bg-black border-b p-3 flex justify-between items-center fixed w-full
            font-bold text-white">

            <div className="justify-start">

                <Link to="/">                   
                    <Icon size={32} icon={home} />
                </Link>
           
                <Link className="pl-10" to="/message">
                    Lähetä viesti
                </Link>

                <Link className="pl-10" to="/contact">
                    Yhteystiedot
                </Link>

                <Link className="pl-10" to="/about">
                    Tietoja
                </Link>
            </div>

            {/* <Link to="/" className="font-bold text-white">
                PointApp
            </Link>
            <Link to="/about" className="font-bold text-white">
                Tietoja
            </Link> */}

            <Navigation />
        </header>
    )
}

export default Header
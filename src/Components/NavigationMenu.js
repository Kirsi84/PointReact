import React from 'react'
import { Link } from "react-router-dom"
import kahvi from './kahvi.jpg';

function NavigationMenu(props){
    return (
        <div>
            <div className="font-bold py-3 text-black">
                <div className="h-10 w-10">
                    <img src={kahvi} alt="kahvi" />
                </div>

                <br></br>
               
                Touko Myllärin luomutila
 
            </div>
            <ul>
                <li>
                    <Link 
                        to="/" 
                        className="text-blue-500 py-3 border-t border-b block"
                        onClick={props.closeMenu}
                    >
                        Tuotteet
                       
                    </Link>
                </li>
             

                <li>
                    <Link 
                        to="/message" 
                        className="text-blue-500 py-3 border-b block"
                        onClick={props.closeMenu}
                    >
                        Lähetä viesti
                    </Link>
                </li>

                <li>
                    <Link 
                        to="/contact" 
                        className="text-blue-500 py-3 border-b block"
                        onClick={props.closeMenu}
                    >
                        Yhteystiedot
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/about" 
                        className="text-blue-500 py-3 border-b block"
                        onClick={props.closeMenu}
                    >
                        Tietoja
                    </Link>
                </li>
      
            </ul>
        </div>
    )
}

export default NavigationMenu
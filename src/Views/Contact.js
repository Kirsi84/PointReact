import React from 'react'
import mustatorvisieni from './mustatorvisieni.jpg'


function Contact(){
    return (
        <div className="py-24">
            
        <div className="text-xl h-auto bg-green-900 border-2 text-white w-1/2
                content-center max-w-screen-md mx-auto w-3/4
                px-16 py-6 text-center">

            Touko Myllärin luomutila
            <br></br>
            Tähkätie 25
            <br></br>
            Puimala
            <br></br>
            Puh. 040 - 123 456
        </div>

        <div className="h-auto bg-green-900 border-2 
            content-center max-w-screen-md mx-auto w-3/4
            px-16 py-6 text-center">
            <img className="w-auto" src={mustatorvisieni} alt="mustatorvisieni" />
        </div>      
       
    </div>       
    )
}

export default Contact
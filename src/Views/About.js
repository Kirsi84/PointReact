import React from 'react'
import letut from './letut.jpg'
import horsmat from './horsmat.jpg'
import herne from './herne.jpg'

function About(){
    return (
       
        <div className="py-24">
           
            <div className="h-auto bg-green-900 border-2
                text-white text-2xl
                content-center max-w-screen-md mx-auto w-3/4
                px-16 py-6 text-center">
                React-PHP-MySql-tailwind harjoitustyö: versio 1.0
            </div>
            
            <div className="h-auto bg-green-900 border-2 
                content-center max-w-screen-md mx-auto w-3/4
                px-16 py-8">
    
                    <div className="flex my-auto content-start flex-wrap bg-gray-400 h-48">
                        <div className="w-1/3 p-2">
                            <div className="text-gray-700 text-center bg-green-900 p-2">
                                <img className="w-full h-40" src={letut} alt="letut" />
                            </div>
                        </div>

                        <div className="w-1/3 p-2">
                            <div className="text-gray-700 text-center bg-gray-400 p-2">
                                <img className="w-auto h-40" src={horsmat} alt="horsmat" />
                            </div>
                        </div>

                        <div className="w-1/3 p-2">
                            <div className="text-gray-700 text-center bg-green-900 p-2">
                                <img className="w-full h-40 content-center " src={herne} alt="herne" />
                            </div>
                        </div>
                    </div>
            </div>            
        </div>      
    )
}

export default About
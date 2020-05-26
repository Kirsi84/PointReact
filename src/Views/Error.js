import React from 'react'
//import ErrorExample from '../Components/ErrorExample'

function Error(){
    return (
        <div>
            <h1 className="text-white font-bold text-2xl mb-3">Virhe</h1>
            <div className="bg-blue-300 mb-2 p-3">
                Virhe tietojen käsittelyssä. Kokeile hetken kuluttua uudelleen!
            </div>
        </div>
    )
}

export default Error
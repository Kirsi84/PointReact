import React from 'react'
import Loader from '../Components/Loader'
import ProductCard from '../Components/ProductCard'
import { useAxiosGet } from '../Hooks/HttpRequests'

import  { Redirect } from 'react-router-dom'

function Home(){
  
    const url = `http://localhost/point-products.php`
    
    let products = useAxiosGet(url)

    let content = null
  
    if(products.error){
        content = <div>        
            return <Redirect to='/error'  />         
        </div>
    }

    if(products.loading){
        content = <Loader></Loader>
    }
  
    if(products.data){
        content = 
        products.data.map((product) => 
            <div key={product.id} className="flex-no-shrink w-full md:w-1/4 md:px-3">
                <ProductCard 
                    product={product}
                />
            </div>
        )
    }
 

    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-2xl mb-3 text-white">
                Tuotteet
            </h1>
            <div className="md:flex flex-wrap md:-mx-3">
                { content } 
            </div>
        </div>
    )
}

export default Home
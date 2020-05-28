import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import { useAxiosGet } from '../Hooks/HttpRequests'
import  { Redirect } from 'react-router-dom'

function Product(){
    const { id } = useParams()
    // Create your own Mock API: https://mockapi.io/
   // const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products/${id}`
     
       
    const url =  `http://localhost/point-product.php/?id=${id}`
    
    let product = useAxiosGet(url)
  
    let content = null

      if(product.error){
        content = <div>
            return <Redirect to='/error'  />          
        </div>
    }

    if(product.loading){
        content = <Loader></Loader>
    }
   

    if(product.data){
     
        content = 
         
        <div className="p-10">
            <div className="max-w-screen-md mx-auto w-3/4  h-auto bg-white
                    border-solid border-4 border-green-900 p-6">

                <h1 className="text-2xl font-bold mb-3">
                    {product.data.name}
                </h1>
                
                <div className="font-bold text-xl mb-3">
                    €  {product.data.price}
                </div>

                <div className="text-xl mb-3">
                    {product.data.description}
                </div>

                <div className="text-xl mb-3">
                    {product.data.information}
                </div>
            </div>
        </div>
    }
    
    return (
        <div className="container mx-auto p-16">
            {content}
        </div>
    )
}

export default Product
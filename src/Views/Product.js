import React from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import { useAxiosGet } from '../Hooks/HttpRequests'

function Product(){
    const { id } = useParams()
    // Create your own Mock API: https://mockapi.io/
   // const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products/${id}`
     
       
    const url =  `http://localhost/point-product.php/?id=${id}`
    
    //console.log("test y:", url)

    let product = useAxiosGet(url)

  
    let content = null

    console.log("Prod:", product)
    if(product.error){
        content = <div>
            <div className="bg-blue-300 mb-2 p-3">
                Virhe tietojen käsittelyssä. Kokeile hetken kuluttua uudelleen!
            </div>
            {/* <div className="bg-blue-300 mb-2 p-3">
                If you see this error. Please remember to create your own <a href="https://mockapi.io/">mock API</a>.
            </div>
            <div className="bg-red-300 p-3">
                There was an error please refresh or try again later.
            </div> */}
        </div>
    }

    if(product.loading){
        content = <Loader></Loader>
    }
   

    if(product.data){
      //  console.log("test q:", product.data)

        content = 
        <div className="max-w-screen-md mx-auto w-3/4  h-64 bg-white border-solid border-4 border-green-900">
            <h1 className="text-2xl font-bold mb-3">
                {product.data.name}
            </h1>
            {/* <div>
                <img
                    src={product.data.images[0].imageUrl}
                    alt={product.data.name}
                />
            </div> */}
            <div className="font-bold text-xl mb-3">
                €  {product.data.price}
            </div>
            <div>
                {product.data.description}
            </div>
        </div>
    }
    else {
        console.log("test R:")
    }

    return (
        <div className="container mx-auto">
            {content}
        </div>
    )
}

export default Product
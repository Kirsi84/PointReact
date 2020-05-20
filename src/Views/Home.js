import React from 'react'
import Loader from '../Components/Loader'
import ProductCard from '../Components/ProductCard'
import { useAxiosGet } from '../Hooks/HttpRequests'

function Home(){
    // Create your own Mock API: https://mockapi.io/
  //  const url = `https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products?page=1&limit=10`
   

    const url = `http://localhost/point-products.php`
     
   // console.log("test1 url: ", url)
    let products = useAxiosGet(url)

   // console.log("test 2: products", products)

   // const allUsers = products.map(data,error,loading) 
   // const allUsers = products.map({id,createdAt,name, description, price}) 



    let content = null
   // console.log("test B: ")
    if(products.error){
        content = <div>
            <div className="bg-blue-300 mb-2 p-3">
                If you see this error. Please remember to create your own <a href="https://mockapi.io/">mock API</a>.
            </div>
            <div className="bg-red-300 p-3">
                There was an error please refresh or try again later.
            </div>
        </div>
    }

    if(products.loading){
        content = <Loader></Loader>
    }

  //  console.log("testc: ", products.data)

    

   // console.log("testd: ", products.data[0].product
 
  
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

    // if(products.users){
    //     content = 
    //     products.users.map((product) => 
    //         <div key={product.id} className="flex-no-shrink w-full md:w-1/4 md:px-3">
    //             <ProductCard 
    //                 product={product}
    //             />
    //         </div>
    //     )
    // }


    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-2xl mb-3">
                Tuotteetrea
            </h1>
            <div className="md:flex flex-wrap md:-mx-3">
                { content } 
            </div>
        </div>
    )
}

export default Home
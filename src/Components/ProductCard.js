import React from 'react'
import {Link} from 'react-router-dom'

function ProductCard(props){
    return (
         
        <div className="p-8">
          
            <div className="bg-white border-solid border-4 border-green-900 p-6">
      
                <h3 className="font-bold text-xl mb-3">
                    <Link to={`/products/${props.product.id}`}>
                        { props.product.name }
                    </Link>    
                </h3>
                <div className="font-bold mb-3">
                    € { props.product.price }
                </div>
                <div className="mb-3">
                    { props.product.description }
                </div>
                <Link 
                    to={`/products/${props.product.id}`}
                    className="bg-red-700 hover:bg-red-900 text-white p-2 flex justify-center w-full">
 
                    Lisätietoja
                </Link>
            </div>
        </div>
    )
}

export default ProductCard
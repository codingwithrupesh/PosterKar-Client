import React from 'react'
import './Product.scss'
// import dummyImg  from '../../assets/top_pick.jpg'
import { useNavigate } from 'react-router-dom'

function Products({product}) {
    // console.log(" top pick is ", product);
    const navigate = useNavigate();
  return (
    <div className='Product' onClick={ ()=> navigate(`/products/${product.attributes.Key}`)}>
        <div className="product-container">
            <div className="product-image">
                <div className="img-container">
                    <img src={product?.attributes?.Image?.data?.attributes?.url} alt={product?.attributes?.Title} />
                </div>
            </div>
            <div className="product-info">
                <p className="title">{product?.attributes?.Title}</p>
                <p className="productPrice">₹ { product?.attributes?.Price}</p>
            </div>
        </div>
    </div>
  )
}

export default Products
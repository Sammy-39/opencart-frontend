import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/product.css'
import Rating from './Rating'

const Product = ({prod}) => {
    return (
        <div className='prod'>
          <Link to={`/product/${prod._id}`}>
            <img className="prod-image" src={prod.image} alt=""/>
          </Link>
          <div className="prod-body">
            <Link to={`/product/${prod._id}`}>
                <h6 className="prod-name"> {prod.name} </h6>
            </Link>
            <Rating value={prod.rating} text={`${prod.numReviews} reviews`} />
            <h6> 	&#8377;{prod.price} </h6>
          </div>
        </div>
    )
}

export default Product

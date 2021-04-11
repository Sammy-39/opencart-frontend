import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import M from 'materialize-css'

import Product from '../components/Product'
import Loader from '../components/Loader'
import {listProducts} from '../actions/products'
import '../styles/home.css'

const Home = () => {

    const carouselRef = useRef(null)

    const dispatch = useDispatch()
    const {loading, error, products} = useSelector(state=>state.ProductsList)

    useEffect(()=>{
        dispatch(listProducts())
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(products && products.length!==0){
            M.Carousel.init(carouselRef?.current)
        }
    },[products])

    useEffect(()=>{
        M.Toast.dismissAll()
        if(error){ M.toast({html: error , classes: '#dd2c00 deep-orange accent-4'}) }
    },[error])

    return (
        <div className="home">
            { 
                loading ? <Loader /> : !error &&
                <>
                   <div className="carousel" ref={carouselRef}>
                       { 
                            products.filter((prod)=>prod.rating>=4).slice(0,3).map((prod,idx)=>(
                                <a key={idx} className="carousel-item" href={`/product/${prod._id}`}>
                                    <img src={prod.image} alt={prod.name} />
                                </a>
                            ))
                       }
                    </div>
                    {
                       products.map((prod,idx)=>(
                        <Product prod={prod} key={idx}/>
                       ))
                    }
                </>
               
            }
        </div>
    )
}

export default Home

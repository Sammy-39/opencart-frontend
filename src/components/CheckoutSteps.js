import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/checkoutSteps.css'

const CheckoutSteps = ({  step1, step2, step3 }) =>{
    return(
        <div className="checkout-steps nav-wrapper">
            { 
                step1 ? <Link to='/shipping' className="breadcrumb"> Shipping </Link> : 
                <Link to='#' className="breadcrumb step-completed"> Shipping </Link> 
            }
            { 
                step2 ? <Link to='/payment' className="breadcrumb"> Payment </Link> : 
                <Link to='#' className="breadcrumb step-completed"> Payment </Link> 
            }
            { 
                step3 ? <Link to='/placeOrder' className="breadcrumb"> Place Order </Link> : 
                <Link to='#' className="breadcrumb step-completed"> Place Order </Link> 
            }
        </div>
    )
}

export default CheckoutSteps
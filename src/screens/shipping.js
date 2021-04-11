import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { saveShippingAddress } from '../actions/cart'
import CheckoutSteps from '../components/CheckoutSteps'
import "../styles/shipping.css"

const Shipping = ({ history }) =>{

    const { cartItems, shippingAddress } = useSelector(state=>state.Cart)
    const { user } = useSelector(state=>state.User)
    const dispatch = useDispatch()

    const [address, setAddress] = 
        useState(shippingAddress.address ? shippingAddress.address : '')
    const [city, setCity] = 
        useState(shippingAddress.city ? shippingAddress.city : '')
    const [postalcode, setPostalcode] = 
        useState(shippingAddress.postalcode ? shippingAddress.postalcode : '')
    const [country, setCountry] = 
        useState(shippingAddress.country ? shippingAddress.country : '')

    useEffect(()=>{
        if(Object.keys(user).length===0 || cartItems.length===0){
            history.push('/')
        }
        // eslint-disable-next-line
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({
            address,
            city,
            postalcode,
            country
        }))
        history.push("/payment")
    }

    return( 
        <div className="shipping">
            <CheckoutSteps step1 />
            <div className="shipping-form">
                <div className="shipping-title">
                    <p> Shipping Details </p>
                </div>
                <form onSubmit={e=>handleSubmit(e)}>
                    <div className="shipping-form-body">
                        <div className="input-field"> 
                            <input id="address" type="text" value={address} required
                            onChange={e=>setAddress(e.target.value)} autoFocus />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="input-field"> 
                            <input id="city" type="text" value={city} required
                            onChange={e=>setCity(e.target.value)} autoFocus />
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="input-field">
                            <input id="postalcode" type='text' value={postalcode}
                            onChange={e=>setPostalcode(e.target.value)} autoFocus required />
                            <label htmlFor="postalcode">Postal Code</label>
                        </div>
                        <div className="input-field">
                            <input id="country" type='text' value={country} 
                            onChange={e=>setCountry(e.target.value)} autoFocus required />
                            <label htmlFor="country">Country</label>
                        </div>
                        <button className="btn #6200ea deep-purple accent-4" type="submit"> 
                            Continue 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Shipping
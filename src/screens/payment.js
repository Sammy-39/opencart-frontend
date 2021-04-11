import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/cart'

import CheckoutSteps from '../components/CheckoutSteps'
import '../styles/payment.css'

const Payment = ({ history }) =>{

    const { cartItems ,shippingAddress, paymentMethod } = useSelector(state=>state.Cart)
    const { user } = useSelector(state=>state.User)
    const dispatch = useDispatch()

    const [paymentOption, setPaymentOption] = useState(paymentMethod)

    useEffect(()=>{
        if(Object.keys(user).length===0 || cartItems.length===0 ){
            history.push("/")
        }
        else if(Object.keys(shippingAddress).length===0){
            history.push("/shipping")
        }
        // eslint-disable-next-line
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentOption))
        history.push('/placeorder')
    }

    return(
        <div className="payment">
            <CheckoutSteps step1 step2 />
            <div className="payment-form">
                <div className="payment-title">
                    <p> Payment Method </p>
                </div>
                <form onSubmit={e=>handleSubmit(e)}>
                    <div className="payment-form-body">
                        <label className="input-field"> 
                            <input className="with-gap" name="payment-method" type="radio"
                            value='PayPal' checked={'PayPal'===paymentOption}
                            onChange={e=>setPaymentOption(e.target.value)} />
                            <span>PayPal</span>
                        </label>
                        <label className="input-field"> 
                            <input className="with-gap" name="payment-method" type="radio"
                            value='Paytm' checked={'Paytm'===paymentOption}
                            onChange={e=>setPaymentOption(e.target.value)} />
                            <span>Paytm</span>
                        </label>
                        <label className="input-field"> 
                            <input className="with-gap" name="payment-method" type="radio"
                            value='Credit/Debit' checked={'Credit/Debit'===paymentOption} 
                            onChange={e=>setPaymentOption(e.target.value)} />
                            <span>Credit/Debit Card</span>
                        </label>
                        <label className="input-field"> 
                            <input className="with-gap" name="payment-method" type="radio"
                            value='Stripe' checked={'Stripe'===paymentOption} 
                            onChange={e=>setPaymentOption(e.target.value)} />
                            <span>Stripe</span>
                        </label>
                        <button className="btn #6200ea deep-purple accent-4" type="submit"> 
                            Continue 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Payment
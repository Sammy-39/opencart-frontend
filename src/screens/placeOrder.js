import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import { createOrder } from '../actions/order'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import payment from '../assets/payment.jpg'
import '../styles/placeOrder.css'

const PlaceOrder = ({ history }) =>{

    const cart = useSelector(state=>state.Cart)
    const { cartItems, shippingAddress, paymentMethod } = cart
    const { user } = useSelector(state=>state.User)
    const { loading, error, order } = useSelector(state=>state.Order)
    const dispatch = useDispatch()

    cart.itemsPrice = Number(cartItems.reduce((acc,item)=>acc + (item.price * item.qty),0).toFixed(2))
    cart.shippingPrice = cart.itemsPrice>100 ? 0 : 100
    cart.taxPrice = Number((0.15*cart.itemsPrice).toFixed(2))
    cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2))

    useEffect(()=>{
        M.Toast.dismissAll()
        if(Object.keys(user).length===0 || cartItems.length===0){
            history.push('/')
        }
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(error){ 
            M.toast({html: error , classes: '#dd2c00 deep-orange accent-4'}) 
            dispatch({type:'ORDER_CREATE_INITIAL_STATE'})
        }
        // eslint-disable-next-line
    },[error])

    useEffect(()=>{
        if(order && Object.keys(order).length!==0){
            history.push(`/order/${order._id}`)
        }
        dispatch({type:'ORDER_CREATE_INITIAL_STATE'})
        // eslint-disable-next-line
    },[order])

    const handlePlaceOrder = () =>{
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return(
        <div className="place-order">
            <CheckoutSteps step1 step2 step3 />
            <div className="place-order-form">
                { loading && <Loader /> }
                <div className="place-order-title">
                    <p> Place Order </p>
                </div>
                <div className="place-order-body">
                    <div className="place-order-main">
                        <div className="place-order-details">
                            <div className="details">
                                <p className="detail-title"> SHIPPING ADDRESS </p>
                                <p className="detail"> {shippingAddress.address}, {shippingAddress.city} - {shippingAddress.postalcode} {shippingAddress.country} </p>
                            </div>
                            <div className="details">
                                <p className="detail-title"> PAYMENT METHOD </p>
                                <p className="detail payment-detail"> <img src={payment} alt='' /> {paymentMethod} </p>
                            </div>
                            <div className="details">
                                <p className="detail-title"> ORDER ITEMS </p>
                                {
                                    cartItems.map((item,idx)=>(
                                        <div className="detail item-detail" key={idx}>
                                            <Link to={`/product/${item.product}`}> <img src={item.image} alt='' /> </Link>
                                            <div className="item-name-price">
                                                <Link to={`/product/${item.product}`}> <p> {item.name} </p> </Link>
                                                <p> {item.qty} x {item.price} = &#8377;{(item.qty*item.price).toFixed(2)} </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="order-summary">
                            <p className="summary-title"> ORDER SUMMARY </p>
                            <div className="summary-line">
                                <p> Items: </p>
                                <p> &#8377;{cart.itemsPrice} </p>
                            </div>
                            <div className="summary-line">
                                <p> Shipping: </p>
                                <p> &#8377;{cart.shippingPrice} </p>
                            </div>
                            <div className="summary-line">
                                <p> Tax: </p>
                                <p> &#8377;{cart.taxPrice} </p>
                            </div>
                            <div className="summary-line">
                                <p> Total: </p>
                                <p>  &#8377;{cart.totalPrice} </p>
                            </div>
                        </div>
                    </div>
                    <button className="btn #6200ea deep-purple accent-4" type="button" onClick={handlePlaceOrder}> 
                        Place Order 
                    </button>    
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
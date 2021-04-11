import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import M from 'materialize-css'

import { getOrderDetails, payOrder } from '../actions/order'
import Loader from '../components/Loader'
import payment from '../assets/payment.jpg'
import '../styles/order.css'

const Order = ({ match, history }) =>{

    const orderId = match.params.id

    const [sdkReady,setSdkReady] = useState(false)

    const { user } = useSelector(state=>state.User)
    const { loading, error, order } = useSelector(state=>state.OrderDetails)
    const { loading:loadingPay, success:successPay, error:errorPay } = useSelector(state=>state.OrderPay)
    const dispatch = useDispatch()

    const addPaypalScript = async () =>{
        const { data:paypalClientId } = await axios.get("/config/paypal")
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}`
        script.async = true
        script.onload = () =>{
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(()=>{     
        if(Object.keys(user).length===0){
            history.push('/')
        }

        dispatch(getOrderDetails(orderId))
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(order && !order.isPaid){
            if(!window.paypal) { addPaypalScript() }
            else { setSdkReady(true) }
        }
    },[order])

    useEffect(()=>{
        M.Toast.dismissAll()
        if(error){ 
            M.toast({html: error , classes: '#dd2c00 deep-orange accent-4'}) 
            dispatch({type:'ORDER_DETAILS_INITIAL_STATE'})
        }
        if(errorPay){ 
            M.toast({html: errorPay , classes: '#dd2c00 deep-orange accent-4'}) 
            dispatch({type:'ORDER_PAY_RESET'})
        }
        // eslint-disable-next-line
    },[error,errorPay])

    useEffect(()=>{
        if(successPay){
            M.toast({html: "Order placed successfully!" , classes: '#33691e light-green darken-4'}) 
            dispatch({type:'ORDER_PAY_RESET'})
            dispatch(getOrderDetails(orderId))
            dispatch({type:"CART_CLEAR_ITEMS"})
        }
        // eslint-disable-next-line
    },[successPay])


    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(orderId,paymentResult))
    }

    return(
        <div className="order">
            <div className="order-form">
                { loading && <Loader /> }
                <div className="order-title">
                    <p> Order <span> {orderId} </span> </p>
                </div>
                {
                    order && 
                    <div className="order-body">
                        <div className="order-main">
                            <div className="order-details">
                                <div className="details">
                                    <p className="detail-title"> SHIPPING ADDRESS </p>
                                    <p className="detail"> {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.postalcode} {order.shippingAddress.country} </p>
                                </div>
                                <div className="details">
                                    <p className="detail-title"> PAYMENT </p>
                                    <div className="detail payment-detail-container"> 
                                        Method: <p className="payment-detail"> <img src={payment} alt='' /> {order.paymentMethod} </p> 
                                    </div>
                                    {  order.isPaid && 
                                       <p className="detail"> 
                                            Paid at: {new Date(order.paidAt).getDate()}/{
                                            new Date(order.paidAt).getMonth()+1}/
                                            {new Date(order.paidAt).getFullYear()} {new Date(order.paidAt).getHours()}:
                                            {new Date(order.paidAt).getMinutes()}:{new Date(order.paidAt).getSeconds()}
                                       </p>
                                    }
                                </div>
                                <div className="details">
                                    <p className="detail-title"> ORDER ITEMS </p>
                                    {
                                        order.orderItems.map((item,idx)=>(
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
                            <div className="order-right-bar">
                                <div className="order-summary">
                                    <p className="summary-title"> ORDER SUMMARY </p>
                                    <div className="summary-line">
                                        <p> Items: </p>
                                        <p> &#8377;{order.itemsPrice} </p>
                                    </div>
                                    <div className="summary-line">
                                        <p> Shipping: </p>
                                        <p> &#8377;{order.shippingPrice} </p>
                                    </div>
                                    <div className="summary-line">
                                        <p> Tax: </p>
                                        <p> &#8377;{order.taxPrice} </p>
                                    </div>
                                    <div className="summary-line">
                                        <p> Total: </p>
                                        <p>  &#8377;{order.totalPrice} </p>
                                    </div>
                                </div>
                                <div className="order-status">
                                    <div className="status-line">
                                        <p> Payment status: </p>
                                        <p className={order.isPaid ? "status-success" : "status-pending"}>  
                                            { order.isPaid ? "Success" : "Pending" } 
                                        </p>
                                    </div>
                                    <div className="status-line">
                                        <p> Delivery status: </p>
                                        <p className={order.isDelivered ? "status-success" : "status-pending"}>  
                                            { order.isDelivered ? "Success" : "On transit" } 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-btns">
                            {
                                !order.isPaid &&
                                <> 
                                {loadingPay && <Loader />}
                                {
                                    !sdkReady ? <Loader /> :
                                    <PayPalButton 
                                     amount={order.totalPrice}
                                     onSuccess={successPaymentHandler}
                                    />
                                }
                                </>
                            } 
                        </div>   
                    </div>
                }
            </div>
        </div>
    )
}

export default Order
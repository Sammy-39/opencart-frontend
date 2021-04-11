import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import { listOrders } from '../actions/order'
import Loader from '../components/Loader'
import noOrder from '../assets/no-order.jpg'
import payment from '../assets/payment.jpg'
import '../styles/myOrders.css'

const MyOrders = ({ history }) =>{

    const { user } = useSelector(state=>state.User)
    const { loading, orders, error } = useSelector(state=>state.OrderList)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(Object.keys(user).length===0){
            history.push('/')
        }

        dispatch(listOrders())
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        M.Toast.dismissAll()
        if(error){ 
            M.toast({html: error , classes: '#dd2c00 deep-orange accent-4'}) 
            dispatch({type:'ORDER_DETAILS_INITIAL_STATE'})
        }
        // eslint-disable-next-line
    },[error])

    return(
        <div className="my-orders-con">
            <div className="my-orders-list">
                { loading && <Loader /> }
                <div className="my-orders-title">
                    My Orders
                </div>
                {
                    (error || orders.length===0) &&
                    <div className="my-orders-list-empty">
                        <img src={noOrder} alt="" />
                        <p> You have not placed any order! </p>
                        <button className='btn #2962ff blue accent-4' onClick={()=>history.push('/')}> 
                            Shop Now 
                        </button>
                    </div> 
                }
                {
                    !error && orders.length!==0 &&
                    <div className="my-orders-list-body">
                        {
                            orders.map((order)=>(
                                order.orderItems.map((item, idx)=>(
                                    <Link to={`order/${order._id}`} key={idx}>
                                        <div className="my-orders-list-item">
                                            <img alt="" src={item.image} />
                                            <p className="item-title"> {item.name} </p>
                                            <p className="item-price"> 
                                                &#8377;{item.price}x{item.qty} = &#8377;{item.price*item.qty} 
                                            </p>
                                            <p className="item-payment-method">
                                                Payment Method: <i> <img src={payment} alt='' /> {order.paymentMethod} </i>
                                            </p>
                                            <div className="item-status">
                                                <div className="item-payment">
                                                    <p> Payment Status: </p>
                                                    <p className={order.isPaid ? "status-success" : "status-pending"}>  
                                                        { order.isPaid ? "Success" : "Pending" } 
                                                    </p>
                                                </div>
                                                <div className="item-delivery">
                                                    <p> Delivery Status: </p>
                                                    <p className={order.isDelivered ? "status-success" : "status-pending"}>  
                                                        { order.isDelivered ? "Success" : "On transit" } 
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default MyOrders


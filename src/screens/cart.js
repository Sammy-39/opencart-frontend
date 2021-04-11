import React, { useEffect } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { addItemsToCart, removeItemFromCart } from '../actions/cart'
import "../styles/cart.css"
import EmptyCart from "../assets/empty-cart.jpg"
import M from 'materialize-css'

const Cart = () =>{

    const params = useParams()
    const location = useLocation()
    const history = useHistory()

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state=>state.Cart)
    const { user } = useSelector(state=>state.User)

    const productId = params.id
    const qty = location.search ? parseInt(location.search.split('=')[1]) : 1

    useEffect(()=>{
        M.Toast.dismissAll()
        if(productId){
            dispatch(addItemsToCart(productId, qty))
            history.replace("/cart")
        }
        // eslint-disable-next-line
    },[])

    const handleAddQty = (id,qty,count) =>{
        M.Toast.dismissAll()
        if(qty<count){
            dispatch(addItemsToCart(id,qty+1))
        }
        if(qty===count){
            M.toast({html: 'Cannot add items more than in stock!', classes: '#dd2c00 deep-orange accent-4'})
        }
    }

    const handleRemoveQty = (id,qty) =>{
        M.Toast.dismissAll()
        if(qty>1){
            dispatch(addItemsToCart(id,qty-1))
        }
        if(qty===1){
            M.toast({html: 'Must have atleast one item!', classes: '#dd2c00 deep-orange accent-4'})
        }
    }

    const handleRemoveItem = (id,name) =>{
        M.Toast.dismissAll()
        dispatch(removeItemFromCart(id))
        M.toast({html: `'${name}' removed`, classes: '#33691e light-green darken-4'})
    }

    const handleCheckout = () =>{
        if(Object.keys(user).length!==0){
            history.push('/shipping')
        }
        else{
            history.push('/login?redirect=shipping')
        }
    }

    return(
        <div className="cart-items">
            <p className="cart-title"> 
                My Cart {cartItems.length!==0 && `(${cartItems.reduce((acc,item)=>acc+(item.qty),0)})`} 
            </p>
             {
                cartItems.length===0 &&
                <div className="cart-empty">
                    <img src={EmptyCart} alt='Empty Cart' />
                    <p> Your cart is empty! </p>
                    <p> Add items to it now </p>
                    <button className='btn #2962ff blue accent-4' onClick={()=>history.push('/')}> 
                        Shop Now 
                    </button>
                </div>
             }
             {
                cartItems.length!==0 && 
                <div className="cart-items-list">
                    <div className="cart-items-list-bar">
                        {cartItems.map((item,idx)=>(
                            <div className="item" key={idx}>
                              <div className="item-img">
                                <Link to={`/product/${item.product}`}> <img src={item.image} alt='' /> </Link>
                              </div>
                              <div className="item-desc">
                                    <p className="item-name"> <Link to={`/product/${item.product}`}> {item.name} </Link> </p>
                                    <p className="item-price"> &#8377;{item.price} </p>
                                    <p className="item-qty"> 
                                        <i className={`material-icons ${item.qty<=1 && 'qty-disabled'}`} 
                                         onClick={()=>handleRemoveQty(item.product,item.qty,item.countInStock)}>
                                        remove </i> 
                                        <span> {item.qty} </span>
                                        <i className={`material-icons ${item.qty>=item.countInStock && 'qty-disabled'} `}
                                         onClick={()=>handleAddQty(item.product,item.qty,item.countInStock)}>
                                        add</i>  
                                    </p>
                                    <button className="btn btn-remove #ff6d00 orange accent-4" 
                                    onClick={()=>handleRemoveItem(item.product,item.name)}> 
                                        Remove Item 
                                    </button> 
                              </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-items-total-bar">
                        <p> SUB TOTAL</p>
                        <p> &#8377;{cartItems.reduce((acc,item)=>acc+(item.price*item.qty),0).toFixed(2)} </p>
                        <button className="btn #00c853 green accent-4" onClick={handleCheckout}> Continue </button>
                        <button className="btn #00acc1 cyan darken-1" onClick={()=>history.push('/')}> Add Items </button>
                    </div>
                </div>
             }
        </div>
    )
}

export default Cart
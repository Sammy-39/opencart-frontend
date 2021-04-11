import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import M from "materialize-css"

import { logout } from '../actions/user'
import logo from "../assets/logo.png"
import "../styles/header.css"

const Header = () => {

    const history = useHistory()

    const sidenavRef = useRef(null)
    const userInfoRef = useRef(null)

    const { cartItems } = useSelector(state=>state.Cart)
    const { user } = useSelector(state=>state.User)
    const dispatch = useDispatch()

    useEffect(()=>{
        M.Sidenav.init(sidenavRef?.current)
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(Object.keys(user).length!==0){
            M.Dropdown.init(userInfoRef?.current)
        }
    },[user])

    const handleLogout = () =>{
        M.Toast.dismissAll()
        dispatch(logout())
        M.toast({
            html: "You have been logged out!" , 
            classes: '#33691e light-green darken-4', 
            displayLength: 2000
        }) 
        history.push('/')
    }

    return (  
        <header>
            <nav>
                <div className="nav-wrapper nav #6200ea deep-purple accent-4">
                    <Link to="/" className="left brand-logo"> 
                        <img src={logo} alt="" /> Opencart
                    </Link>
                    <a href="#!" data-target="sdnav" className="right sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            { Object.keys(user).length===0 &&
                              <Link to="/login" className="btn #ffffff white blue-text text-darken-2 btn-login">
                                Login
                              </Link> 
                              }
                        </li>
                        <li className="cart">
                            <Link to="/cart">
                                { cartItems.length!==0 && <p className='cart-item-count'> {cartItems.length} </p> }
                                <i className="material-icons">shopping_cart</i> Cart
                            </Link>
                        </li>
                        <li>
                            { Object.keys(user).length!==0 &&
                              <>
                              <button className='btn-floating user-btn btn-med #ffea00 yellow accent-3 dropdown-trigger' 
                              data-target='user' ref={userInfoRef}> 
                                {user.name[0]} 
                              </button>
                              <div className="user-info dropdown-content" id="user">
                                <button className='btn-floating user-btn btn-med #ffea00 yellow accent-3'> 
                                    {user.name[0]} 
                                </button>
                                <p> {user.name} </p>
                                <p> {user.email} </p>
                                <p className="my-orders" onClick={()=>history.push("/orders")}> 
                                    <i className="material-icons"> unarchive </i>  My Orders 
                                </p>
                                <button className="btn #b2ebf2 #ff6d00 orange accent-4" onClick={handleLogout}> Signout </button>
                            </div>
                              </>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="sdnav" ref={sidenavRef}>
                { Object.keys(user).length!==0 &&
                    <div className="user-info" id="user">
                        <button className='btn-floating user-btn sidenav-close btn-med #ffea00 yellow accent-3'> 
                            {user.name[0]} 
                        </button>
                        <p className="sidenav-close"> {user.name} </p>
                        <p className="sidenav-close"> {user.email} </p>
                        <p className="sidenav-close my-orders" onClick={()=>history.push("/orders")}> 
                            <i className="material-icons"> unarchive </i>  My Orders
                        </p>
                        <div className="sidenav-cart sidenav-close">
                            <Link to="/cart">
                                { cartItems.length!==0 && <p> {cartItems.length} </p> }
                                <i className="material-icons">shopping_cart</i> Cart
                            </Link>
                        </div>
                        <button className="btn sidenav-close #b2ebf2 #ff6d00 orange accent-4" 
                        onClick={handleLogout}> 
                            Signout 
                        </button>
                    </div>
                }
                { Object.keys(user).length===0 &&
                    <>
                    <li>
                        <Link className="sidenav-close" to="/login">Sign In</Link>
                    </li>
                    <li>
                        <Link className="sidenav-close" to="/cart">Cart</Link>
                    </li>
                    </>
                }
            </ul>
        </header>
    )
}

export default Header

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import Loader from '../components/Loader'
import { register } from '../actions/user'
import logo from "../assets/logo.png"
import '../styles/register.css'

const Regsiter = ({ location, history }) =>{

    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [disable,setDisable] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    
    const redirect = location.search ? location.search.split('=')[1] : ''

    const {loading, error, message} = useSelector(state=>state.Register)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(message){
            setName('')
            setEmail('')
            setPassword('')
            M.toast({
                html: 'Registered Successfully!' , 
                classes: '#33691e light-green darken-4', 
                displayLength: 2000
            })
            history.push(redirect ? `/login?redirect=${redirect}` : '/login')
            dispatch({type:"USER_REGISTER_INITIAL_STATE"})
        }
        // eslint-disable-next-line
    },[message])

    useEffect(()=>{
        if(loading){
            setDisable(true)
        }
        else{
            setDisable(false)
        }
    },[loading])

    useEffect(()=>{
        if(error){
            M.Toast.dismissAll()
            if(error){ M.toast({html: error , classes: '#dd2c00 deep-orange accent-4'}) }
            dispatch({type:"USER_REGISTER_INITIAL_STATE"})
        }
        // eslint-disable-next-line
    },[error])

    const handleShowPassword = () =>{
        if(showPassword) { setShowPassword(false) }
        else{ setShowPassword(true) }
    }

    const handleRegister = (e) =>{
        M.Toast.dismissAll()
        e.preventDefault()
        dispatch(register(name,email,password))
    }
 
    return(
        <div className="register">
            <div className="register-form">
                {loading && <Loader />} 
                <h5> <img src={logo} alt='' />  Opencart </h5>
                <form onSubmit={e=>handleRegister(e)}>
                    <div className="input-field"> 
                        <input id="name" type="text" value={name} required
                        onChange={e=>setName(e.target.value)} disabled={disable} />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field"> 
                        <input id="email" type="email" value={email} required
                        onChange={e=>setEmail(e.target.value)} disabled={disable} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <i className={`material-icons visible ${showPassword && 'visible-on'}`} 
                        onClick={handleShowPassword}> visibility_off </i>
                        <input id="password" type={showPassword ? 'text': 'password'} value={password} 
                        onChange={e=>setPassword(e.target.value)} disabled={disable} required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn register-btn #6200ea deep-purple accent-4" type="submit"
                    disabled={disable}> 
                        Continue 
                     </button>
                    <Link className="login" 
                     to={ disable ? '#' : redirect ? `/login?redirect=${redirect}` : '/login'}> 
                     Already have an account? Login </Link>
                </form>
            </div>
        </div>
    )
}

export default Regsiter
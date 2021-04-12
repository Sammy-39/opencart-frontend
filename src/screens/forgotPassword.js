import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import { forgotPassword, resetPassword } from '../actions/user'
import Loader from '../components/Loader'
import logo from "../assets/logo.png"
import '../styles/forgotPassword.css'

const ForgotPassword = ({ history }) =>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [resetPasswordOTP,setresetPasswordOTP] = useState('')
    const [disable,setDisable] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const [showResetPassword, setShowResetPassword] = useState(false)

    const {
        loading: forgotPasswordLoading, 
        message: forgotPasswordMesssage, 
        error: forgotPasswordError
    } = useSelector(state=>state.ForgotPassword)
    const {
        loading: resetPasswordLoading, 
        message: resetPasswordMessage, 
        error: resetPasswordError 
    } = useSelector(state=>state.ResetPassword)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(resetPasswordLoading || forgotPasswordLoading){
            setDisable(true)
        }
        else{
            setDisable(false)
        }
        // eslint-disable-next-line
    },[resetPasswordLoading, forgotPasswordLoading])

    useEffect(()=>{
        if(forgotPasswordMesssage){
            M.Toast.dismissAll()
            M.toast({html: forgotPasswordMesssage , classes: '#33691e light-green darken-4'}) 
            setShowResetPassword(true)
            dispatch({type:"FORGOT_PASSWORD_RESET"})
        }
        if(resetPasswordMessage){
            setEmail('')
            setPassword('')
            setresetPasswordOTP('')
            M.Toast.dismissAll()
            M.toast({html: resetPasswordMessage , classes: '#33691e light-green darken-4'}) 
            dispatch({type:"RESET_PASSWORD_RESET"})
            history.push("/login")

        }
        // eslint-disable-next-line
    },[forgotPasswordMesssage, resetPasswordMessage])

    useEffect(()=>{
        if(forgotPasswordError){
            M.Toast.dismissAll()
            M.toast({html: forgotPasswordError , classes: '#dd2c00 deep-orange accent-4'}) 
            dispatch({type:"FORGOT_PASSWORD_RESET"})
        }
        if(resetPasswordError){
            M.Toast.dismissAll()
            M.toast({html: resetPasswordError , classes: '#dd2c00 deep-orange accent-4'}) 
            dispatch({type:"RESET_PASSWORD_RESET"})
        }
        // eslint-disable-next-line
    },[forgotPasswordError, resetPasswordError])

    const handleShowPassword = () =>{
        if(showPassword) { setShowPassword(false) }
        else{ setShowPassword(true) }
    }

    const handleGetOTP = (e) =>{
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    const handleResetPassword = (e) =>{
        e.preventDefault()
        dispatch(resetPassword(email,password,resetPasswordOTP))
    }

    return(
        <div className="forgot-password">
            <div className="forgot-password-form">
                {(forgotPasswordLoading || resetPasswordLoading) && <Loader />} 
                <h5> <img src={logo} alt='' /> Opencart </h5>
                <form onSubmit={e=>{return !showResetPassword ? handleGetOTP(e) : handleResetPassword(e)}}>
                    <div className="input-field"> 
                        <input id="email" type="email" value={email} required
                        onChange={e=>setEmail(e.target.value)} disabled={disable} />
                        <label htmlFor="email">Email</label>
                    </div>
                    {
                        showResetPassword &&
                        <>
                            <div className="input-field">
                                <input id="otp" type="text" value={resetPasswordOTP} 
                                onChange={e=>setresetPasswordOTP(e.target.value)} disabled={disable} required />
                                <label htmlFor="otp">OTP</label>
                            </div>
                            <div className="input-field">
                                <i className={`material-icons visible ${showPassword && 'visible-on'}`} 
                                onClick={handleShowPassword}> visibility_off </i>
                                <input id="password" type={showPassword ? 'text': 'password'} value={password} 
                                onChange={e=>setPassword(e.target.value)} disabled={disable} required />
                                <label htmlFor="password">Password</label>
                            </div>
                        </>
                    }
                    <button className="btn #6200ea deep-purple accent-4" type="submit"
                     disabled={disable}> 
                        { !showResetPassword ? 'GET OTP' : 'RESET PASSWORD' } 
                     </button>
                    <Link className="login-link" 
                     to={ disable ? '#' : '/login'}> 
                     Already have an account? Login </Link>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
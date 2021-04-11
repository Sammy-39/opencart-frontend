import axios from 'axios'

export const login  = (email,password) => async (dispatch) =>{
    try{
        dispatch({type: "USER_LOGIN_REQUEST"})

        const config = {
            headers :{ "Content-Type": "application/json" }
        }
        const { data } = await axios.post('/login', { email, password }, config)

        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data.user
        })

        localStorage.setItem("user", JSON.stringify(data.user))
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'USER_LOGIN_ERROR', 
            payload: errMsg
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('user')
    dispatch({type:'USER_LOGOUT'})
}

export const register = (name,email,password) => async (dispatch) =>{
    try{
        dispatch({type: "USER_REGISTER_REQUEST"})

        const config = {
            headers :{ "Content-Type": "application/json" }
        }
        const { data } = await axios.post('/register', { name, email, password }, config)

        dispatch({
            type: "USER_REGISTER_SUCCESS",
            payload: data.message
        })
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'USER_REGISTER_ERROR', 
            payload: errMsg
        })
    }
} 
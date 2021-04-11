import axios from 'axios'

export const createOrder  = (order) => async (dispatch) =>{
    try{
        dispatch({type: "ORDER_CREATE_REQUEST"})

        const config = {
            headers : { "Content-Type": "application/json" }
        }
        const { data } = await axios.post('/order', order, config)

        dispatch({
            type: "ORDER_CREATE_SUCCESS",
            payload: data
        })
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'ORDER_CREATE_ERROR', 
            payload: errMsg
        })
    }
}

export const getOrderDetails  = (id) => async (dispatch) =>{
    try{
        dispatch({type: "ORDER_DETAILS_REQUEST"})

        const { data } = await axios.get(`/order/${id}`)

        dispatch({
            type: "ORDER_DETAILS_SUCCESS",
            payload: data
        })
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'ORDER_DETAILS_ERROR', 
            payload: errMsg
        })
    }
}

export const payOrder  = (orderId, paymentResult) => async (dispatch) =>{
    try{
        dispatch({type: "ORDER_PAY_REQUEST"})

        const config = {
            headers : { "Content-Type": "application/json" }
        }
        const { data } = await axios.put(`/order/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: "ORDER_PAY_SUCCESS",
            payload: data
        })
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'ORDER_PAY_ERROR', 
            payload: errMsg
        })
    }
}

export const listOrders  = () => async (dispatch) =>{
    try{
        dispatch({type: "ORDER_LIST_REQUEST"})

        const { data } = await axios.get(`/myorders`)

        dispatch({
            type: "ORDER_LIST_SUCCESS",
            payload: data
        })
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'ORDER_LIST_ERROR', 
            payload: errMsg
        })
    }
}
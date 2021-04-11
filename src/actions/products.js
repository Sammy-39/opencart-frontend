import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    try{
        dispatch({type: 'PRODUCT_LIST_REQUEST'})
        
        const {data} = await axios.get('products')
        dispatch({type: 'PRODUCT_LIST_SUCCESS', payload: data})
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'PRODUCT_LIST_ERROR', 
            payload: errMsg
        })
    }
}

export const getProductDetails = (id) => async (dispatch) =>{
    try{
        dispatch({type: 'PRODUCT_REQUEST'})

        const {data} = await axios.get(`product/${id}`)
        dispatch({type: 'PRODUCT_SUCCESS', payload: data})
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'PRODUCT_ERROR', 
            payload: errMsg
        })
    }

}
export const reviewProduct = (id, review) => async (dispatch) =>{
    try{
        dispatch({type: 'PRODUCT_REVIEW_REQUEST'})

        const config = {
            headers : { 'Content-Type': 'application/json' }
        }

        const {data} = await axios.post(`product/${id}/review`, review, config)
        dispatch({type: 'PRODUCT_REVIEW_SUCCESS', payload: data.message})
    }
    catch(err){
        const errMsg = err.response && err.response.data.message ?
        err.response.status===500 ? 'Connection Timeout!!' :
        err.response.data.message : err.response
        dispatch({
            type: 'PRODUCT_REVIEW_ERROR', 
            payload: errMsg
        })
    }
}
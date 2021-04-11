
export const Order = ( state = {}, action ) =>{
    switch(action.type){
        case 'ORDER_CREATE_REQUEST':
            return {
                loading : true
            }
        case 'ORDER_CREATE_SUCCESS':
            return{
                loading: false,
                order: action.payload
            }
        case 'ORDER_CREATE_ERROR':
            return{
                loading: false,
                error: action.payload
            }
        case 'ORDER_CREATE_INITIAL_STATE':
            return {}
        default:
            return state
    }
}

export const OrderDetails = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) =>{
    switch(action.type){
        case 'ORDER_DETAILS_REQUEST':
            return {
                ...state,
                loading : true
            }
        case 'ORDER_DETAILS_SUCCESS':
            return{
                loading: false,
                order: action.payload
            }
        case 'ORDER_DETAILS_ERROR':
            return{
                loading: false,
                error: action.payload
            }
        case 'ORDER_DETAILS_INITIAL_STATE':
            return { orderItems: [], shippingAddress: {} }
        default:
            return state
    }
}

export const OrderList = (state = { orders: [] }, action) =>{
    switch(action.type){
        case 'ORDER_LIST_REQUEST':
            return {
                orders: [],
                loading : true
            }
        case 'ORDER_LIST_SUCCESS':
            return{
                loading: false,
                orders: action.payload
            }
        case 'ORDER_LIST_ERROR':
            return{
                loading: false,
                error: action.payload,
                orders: []
            }
        case 'ORDER_LIST_RESET':
            return { orders: [] }
        default:
            return state
    }
}

export const OrderPay = (state = {}, action) =>{
    switch(action.type){
        case 'ORDER_PAY_REQUEST':
            return {
                loading : true
            }
        case 'ORDER_PAY_SUCCESS':
            return{
                loading: false,
                success: true
            }
        case 'ORDER_PAY_ERROR':
            return{
                loading: false,
                error: action.payload
            }
        case 'ORDER_PAY_RESET':
            return {}
        default:
            return state
    }
}

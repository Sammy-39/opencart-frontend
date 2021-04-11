
export const Cart = (state = { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }, action) =>{
    switch(action.type){
        case 'CART_ADD_ITEM':
            const item = action.payload
            if(state.cartItems.find(x=>x.product===item.product)){
                return { ...state, cartItems: state.cartItems
                    .map(x=>x.product===item.product? item : x)}
            }
            else{
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case 'CART_REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(item=>item.product!==action.payload)
            }
        case 'CART_SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                shippingAddress: action.payload
            }
        case 'CART_SAVE_PAYMENT_METHOD':
            return {
                ...state,
                paymentMethod: action.payload
            }
        case 'CART_CLEAR_ITEMS':
            return { 
                shippingAddress : state.shippingAddress,
                cartItems: [],
                paymentMethod: 'PayPal' 
            }
        default:
            return state
    }
}
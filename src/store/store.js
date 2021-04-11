import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { ProductsList, Product, ProductReview } from '../reducers/productsReducers'
import { Cart } from '../reducers/cartReducer'
import { User, Register } from '../reducers/userReducer'
import { Order, OrderDetails, OrderPay, OrderList } from '../reducers/orderReducer'

const reducer = combineReducers({
    ProductsList,
    Product,
    Cart,
    User,
    Register,
    Order,
    OrderDetails,
    OrderPay,
    OrderList,
    ProductReview
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethod = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'PayPal'
const initialState = { 
    Cart: { cartItems, shippingAddress, paymentMethod  },
    User: { user }
 } 

const middlewares = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store
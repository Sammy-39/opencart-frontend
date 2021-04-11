
export const ProductsList = (state = {loading: false, products: []},action) =>{
    switch(action.type){
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS':
            return { loading: false, products: action.payload }
        case 'PRODUCT_LIST_ERROR':
            return { loading: false, error: action.payload, products: [] }
        default:
            return state
    }
}

export const Product = (state = {loading: false, product: {}},action) =>{
    switch(action.type){
        case 'PRODUCT_REQUEST':
            return { loading: true, product: {} }
        case 'PRODUCT_SUCCESS':
            return { loading: false, product: action.payload }
        case 'PRODUCT_ERROR':
            return { loading: false, error: action.payload, product: {} }
        default:
            return state
    }
}

export const ProductReview = (state = {},action) =>{
    switch(action.type){
        case 'PRODUCT_REVIEW_REQUEST':
            return { loading: true }
        case 'PRODUCT_REVIEW_SUCCESS':
            return { loading: false, message: action.payload }
        case 'PRODUCT_REVIEW_ERROR':
            return { loading: false, error: action.payload }
        case 'PRODUCT_REVIEW_RESET':
            return { }
        default:
            return state
    }
}
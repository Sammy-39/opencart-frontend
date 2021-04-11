
export const User = (state = {loading: false, user: {}},action) =>{
    switch(action.type){
        case 'USER_LOGIN_REQUEST':
            return { loading: true, user: {} }
        case 'USER_LOGIN_SUCCESS':
            return { loading: false, user: action.payload }
        case 'USER_LOGIN_ERROR':
            return { loading: false, error: action.payload, user: {} }
        case 'USER_LOGOUT':
            return { loading: false, user: {} }
        default:
            return state
    }
}

export const Register = (state={loading: false}, action) =>{
    switch(action.type){
        case 'USER_REGISTER_REQUEST':
            return { loading: true }
        case 'USER_REGISTER_SUCCESS':
            return { loading: false, message: action.payload }
        case 'USER_REGISTER_ERROR':
            return { loading: false, error: action.payload }
        case 'USER_REGISTER_INITIAL_STATE':
            return { loading: false }
        default:
            return state
    }
}
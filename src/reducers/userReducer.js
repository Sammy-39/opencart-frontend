
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

export const ForgotPassword = (state={loading: false}, action) =>{
    switch(action.type){
        case 'FORGOT_PASSWORD_REQUEST':
            return { loading: true }
        case 'FORGOT_PASSWORD_SUCCESS':
            return { loading: false, message: action.payload }
        case 'FORGOT_PASSWORD_ERROR':
            return { loading: false, error: action.payload }
        case 'FORGOT_PASSWORD_RESET':
            return { loading: false }
        default:
            return state
    }
}

export const ResetPassword = (state={loading: false}, action) =>{
    switch(action.type){
        case 'RESET_PASSWORD_REQUEST':
            return { loading: true }
        case 'RESET_PASSWORD_SUCCESS':
            return { loading: false, message: action.payload }
        case 'RESET_PASSWORD_ERROR':
            return { loading: false, error: action.payload }
        case 'RESET_PASSWORD_RESET':
            return { loading: false }
        default:
            return state
    }
}
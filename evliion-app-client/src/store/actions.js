import {reducerActions} from "../constants";
import {getCurrentUser} from "../util/APIUtils";

const dispatchLoggedUserSuccess = (data) => {
    return {
        type: reducerActions.GET_LOGGED_USER_SUCCESS,
        data: {
            ...data,
            job: {
                error: false,
                isAuthenticated: true,
                isLoading: false
            }
        }
    }
};

const dispatchLoggedUserFailed = () => {
    return {
        type: reducerActions.GET_LOGGED_USER_FAILED,
        data: {
            job: {
                error: true,
                isAuthenticated: 'maybe',
                isLoading: false
            }
        }
    }
};

export const getLoggedUser = () => {
    return dispatch => {
        getCurrentUser()
            .then(response => {
                dispatch(dispatchLoggedUserSuccess(response))
            })
            .catch(error => {
                dispatch(dispatchLoggedUserFailed())
            })
    }
};
export const logout = (logoutData) => {
    return {
        type: reducerActions.LOGOUT_USER,
        data: {
            job: {
                error: false,
                ...logoutData
            }
        }
    }
};
export const handleAddPaymentCards = (value) => {
    return {
        type: reducerActions.ADD_PAYMENT_CARDS,
        data: value
    }
};
export const handleUpdatePaymentCards = (value) => {
    return {
        type: reducerActions.UPDATE_PAYMENT_CARDS,
        data: value
    }
};

export const handleDeletePaymentCards = (data) => {
    return {
        type: reducerActions.DELETE_PAYMENT_CARDS,
        data: data
    }
};



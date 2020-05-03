import {reducerActions, businessListActions, BUSINESS_LIST_SIZE} from "../constants";
import {getCurrentUser, searchForBusiness, getAllBusiness} from "../util/APIUtils";

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


const dispatchFetchSucessBusinessList = (data) => {
    return {
        type: businessListActions.FETCH_SUCCESS_BUSINESS_LIST,
        data
    }
}

const dispatchFetchFailBusinessList = (error) => {
    return {
        type: businessListActions.FETCH_ERROR_BUSINESS_LIST,
        error
    }
}

const dispatchFetchingBusinessList  = () => {
    return {
        type: businessListActions.FETCHING_BUSINESS_LIST,
    }
}

const dispatchClearBusinessList = () => {
    return {
        type: businessListActions.CLEAR_BUSINESS_LIST    
    }
}

export const getAllBusinessList = (page = 0, size = BUSINESS_LIST_SIZE) => {
    return dispatch => {
        dispatch(dispatchFetchingBusinessList())
        getAllBusiness(page, size)
            .then(response => {
                dispatch(dispatchFetchSucessBusinessList(response))
            })
            .catch(error => {
                dispatch(dispatchFetchFailBusinessList(error))
            })
    }
};

export const searchBusinessList = (searchTerm, page = 0, size = BUSINESS_LIST_SIZE) => {
    return dispatch => {
        dispatch(dispatchClearBusinessList())
        dispatch(dispatchFetchingBusinessList())
        searchForBusiness(page, size, searchTerm)
            .then(response => {
                dispatch(dispatchFetchSucessBusinessList(response))
            })
            .catch(error => {
                dispatch(dispatchFetchFailBusinessList(error))
            })
    }
};



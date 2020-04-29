import {reducerActions} from "../../constants";

export const loggedState = {
    paymentCards: [],
    job: {
        isLoading: true,
    }
};

const logoutState = {
    paymentCards: [],
    job: {
        isAuthenticated: false,
    }
};

export const reducer = (state = loggedState, action) => {
    switch (action.type) {
        case reducerActions.GET_LOGGED_USER_SUCCESS:
            return {
                ...state,
                ...action.data
            };
        case reducerActions.GET_LOGGED_USER_FAILED:
            return {
                ...state,
                job: {
                    ...action.data.job
                }
            };
        case reducerActions.LOGOUT_USER:
            return {
                ...logoutState,
                ...action.data
            };
        case reducerActions.ADD_PAYMENT_CARDS:
            return {
                ...state,
                paymentCards: [...action.data]
            };
        case reducerActions.UPDATE_PAYMENT_CARDS:
            return {
                ...state,
                paymentCards: [...action.data]
            };
        case reducerActions.DELETE_PAYMENT_CARDS:
            return {
                ...state,
                paymentCards: [...action.data]
            };
        default:
            return state;
    }
};

export default reducer;

import {businessListActions} from "../../constants";

export const businessListState = {
    isFetching: false,
    data: {content: []},
    error: null
};

export const reducer = (state = businessListState, action) => {
    switch (action.type) {
        case businessListActions.FETCH_SUCCESS_BUSINESS_LIST:
            return {
                ...state,
                data: {
                    ...action.data,
                    content: [
                        ...state.data.content,
                        ...action.data.content
                    ]
                },
                isLoading: false,
            };
        case businessListActions.FETCH_ERROR_BUSINESS_LIST:
            return {
                ...state,
                error: action.error,
                data: null,
                isLoading: false
            };
        case businessListActions.FETCHING_BUSINESS_LIST:
            return {
                ...state,
                isLoading: true
            };
        case businessListActions.CLEAR_BUSINESS_LIST:
            return {
                ...state,
                data: {
                    content: []
                },
            };
        default:
            return state;
    }
};

export default reducer;

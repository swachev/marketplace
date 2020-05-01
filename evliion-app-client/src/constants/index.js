export const APP_NAME = 'Evliion App';
export const API_BASE_URL = 'http://localhost:5000/api';
//export const API_BASE_URL = '/api';


//reducers constants actions
export const reducerActions = {
    GET_LOGGED_USER_SUCCESS : "GET_LOGGED_USER_SUCCESS",
    GET_LOGGED_USER_FAILED : "GET_LOGGED_USER_FAILED",
    LOGOUT_USER : "LOGOUT_USER",
    ADD_PAYMENT_CARDS : "ADD_PAYMENT_CARDS",
    UPDATE_PAYMENT_CARDS : "UPDATE_PAYMENT_CARDS",
    DELETE_PAYMENT_CARDS : "DELETE_PAYMENT_CARDS",
};

// avoid typo mistakes

export const POST = 'POST';
export const GET = 'GET';
export const DELETE = 'DELETE';

export const UIMessages = {
    paymentCards : {
        add: 'Payment method Created Successfully!',
        update: 'Payment method updated Successfully!',
        delete: 'Payment method delete Successfully!',
        duplicate: 'Payment method card already exist. Please add another card!',
        duplicateNumber: 'Card number already exist. Please change the number!',
        error: 'Temporary issue, please try after few seconds!'
    },
};

export const ROLE_USER = 'ROLE_USER';
export const ROLE_ADMIN = 'ROLE_ADMIN';

export const OWNER_CARD = 'Owner card';
export const CARD_NUMBER = 'Card number';
export const CARD_EXPIRY = 'Card expiry';
export const CARD_CVV = 'Card cvv';
export const CARD = [OWNER_CARD, CARD_NUMBER, CARD_EXPIRY];

//export const ROLES
export const EVILIION_ROLES = [ROLE_USER,ROLE_ADMIN]; // to check if the desired roles are known

// const for payment cards
export const paymentCards = {
    'visa': {src: 'http://www.credit-card-logos.com/images/visa_credit-card-logos/visa_logo_8.gif'} ,
    'mastercard': {src: 'http:///www.credit-card-logos.com/images/mastercard_credit-card-logos/mastercard_logo_8.gif'},
    'discover': {src: 'http://www.credit-card-logos.com/images/discover_credit-card-logos/discover_network1.jpg'},
    'amex': {src: 'http://www.credit-card-logos.com/images/american_express_credit-card-logos/american_express_logo_7.gif'}
};

export const ACCESS_TOKEN = 'accessToken';

export const POLL_LIST_SIZE = 30;
export const BUSINESS_LIST_SIZE = 30;

export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const DEFAULT_CURRENT_LOCATION = {longitude: 40.730610, latitud: -73.935242} //New York
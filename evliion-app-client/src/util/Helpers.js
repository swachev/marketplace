import {EVILIION_ROLES, paymentCards} from "../constants";

export const makeExpiry = (month, year) => {
    const expiration = [];
    expiration.push(month);
    expiration.push(year);
    return expiration.join('/');
};
export const onlyKeyName = (el) => {
    const thisAr = [];
    for (let key in el) {
        if (el.hasOwnProperty(key)) {
            thisAr.push(key);
        }
    }
    return thisAr;
};
export const UserException = (message, name) => {
    return {
        message: message,
        name: name
    }
};
// deep similarity check
export const isSame = (firstValue, secondValue, checkLength = true, checkId = false) => {
    const check = Object.keys,
        type1 = typeof firstValue,
        type2 = typeof secondValue;
    return firstValue && secondValue && type1 === 'object' && type1 === type2 ? (
        (checkLength ? sameObjectLength(firstValue, secondValue) : true) &&
        check(firstValue).every(key => checkId ? isSame(firstValue[key], secondValue[key], checkLength, checkId) :
            key !== 'id' && isSame(firstValue[key], secondValue[key], checkLength, checkId))
    ) : (firstValue === secondValue);
};

const sameObjectLength = (x, y) => {
    const check = Object.keys;
    return check(x).length === check(y).length
};

export const arrayThis = (el) => {
    const thisAr = [];
    for (let key in el) {
        if (el.hasOwnProperty(key)) {
            thisAr.push({
                id: key,
                data: el[key]
            });
        }
    }
    return thisAr;
};

export function paymentImage(type) {
    return paymentCards[type] ? paymentCards[type].src : '';
}

/**
 * @return {boolean}
 */
export function IsThisDateExpiry(date) {
    return date <= new Date();
}

export function evillionRender(desiredRoles = [], userRoles = []) {
    const nowCheck = userRoles.map(el => el['authority']);
    for (let i in desiredRoles) {
        if (desiredRoles.hasOwnProperty(i)) {
            return EVILIION_ROLES.includes(desiredRoles[i]) &&
                desiredRoles.some(role => nowCheck.includes(role));
        }
    }
}


export function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + year;
}

export function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
}  

export function getCurrentLocation() {
    return new Promise(
        (resolve, reject) => {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        }
    )
}
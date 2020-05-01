import {API_BASE_URL, POLL_LIST_SIZE, BUSINESS_LIST_SIZE, ACCESS_TOKEN, POST, GET, DELETE} from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllPolls(page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/polls?page=" + page + "&size=" + size,
        method: GET
    });
}

export function getAllBusiness(page, size) {
    page = page || 0;
    size = size || BUSINESS_LIST_SIZE;

    // return request({
    //     url: API_BASE_URL + "/business?page=" + page + "&size=" + size,
    //     method: GET
    // });

    //TODO: (Mock) Remove when actual logic will be implemented
    return new Promise((resolve, reject) => resolve(
        {
            content: [
                {id: 1, name: 'Flowers Lolita', coordinates: {latitude: 40.9865328, longitude: -6.7962528}, photoUrl: "https://picsum.photos/350/100?random"}, 
                {id: 2, name: 'Clothes Paco', coordinates: {latitude: 40.9865328, longitude: -6.7962528}, photoUrl: "https://picsum.photos/350/100?random"},
                {id: 3, name: 'Really large name name name name name name', coordinates: {latitude: 40.9865328, longitude: -6.7962528}, photoUrl: "https://picsum.photos/350/100?random"},
                {id: 4, name: 'Clothes Paco', coordinates: {latitude: 40.9865328, longitude: -6.7962528}, photoUrl: "https://picsum.photos/350/100?random"},
                {id: 5, name: 'Clothes Paco', coordinates: {latitude: 40.9865328, longitude: -6.7962528}, photoUrl: "https://picsum.photos/350/100?random"},
                {id: 6, name: 'Clothes Paco', coordinates: {latitude: 40.9865328, longitude: -6.7962528}, photoUrl: "https://picsum.photos/350/100?random"},
            ],
        }
    ))
}

export function getBusinessByPlace(place, page, size) {
    page = page || 0;
    size = size || BUSINESS_LIST_SIZE;

    // return request({
    //     url: API_BASE_URL + "/business?page=" + page + "&size=" + size,
    //     method: GET
    // });

    //TODO: (Mock) Remove when actual logic will be implemented
    return new Promise((resolve, reject) => resolve(
        {
            content: [
                {id: 1, name: 'Flowers Lolita', distance: '100m', photoUrl: "https://picsum.photos/350/100?random"}, 
                {id: 2, name: 'Clothes Paco', distance: '100m', photoUrl: "https://picsum.photos/350/100?random"},
            ],
        }
    ))
}

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/polls",
        method: POST,
        body: JSON.stringify(pollData)
    });
}

export function castVote(voteData) {
    return request({
        url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
        method: POST,
        body: JSON.stringify(voteData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: POST,
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: POST,
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: GET
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: GET
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: GET
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: GET
    });
}

export function getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/polls?page=" + page + "&size=" + size,
        method: GET
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || POLL_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?page=" + page + "&size=" + size,
        method: GET
    });
}

export function getStation(stationId) {
    return request({
        url: API_BASE_URL + "/station/" + stationId,
        method: GET
    });
}

export function getVehicle(vehicleId) {
    return request({
        url: API_BASE_URL + "/vehicle/" + vehicleId,
        method: GET
    });
}

export function addUserCard(CardData) {
    return request({
        url: API_BASE_URL + "/v1/payment-method",
        method: POST,
        body: JSON.stringify(CardData)
    });

}

export function getUserCard(cardId) {
    return request({
        url: API_BASE_URL + "/v1/payment-method/"+cardId,
        method: GET
    });
}

export function deleteUserCard(cardId) {
    return request({
        url: API_BASE_URL + "/v1/payment-method/"+cardId,
        method: DELETE,
    });
}

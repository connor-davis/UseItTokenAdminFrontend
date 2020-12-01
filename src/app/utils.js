import axios from 'axios';

import {store} from "./store";

import {setUsers} from "./slices/users";
import {setItems} from "./slices/items";
import {setUser} from "./slices/user";
import {setLoading} from "./slices/loading";
import {addNotification} from "./slices/notifications";

let dispatch = store.dispatch;

function fetchUsers() {
    let {user} = store.getState().userReducer;

    axios.get(API_URL + "/users/", {
        headers: {
            "Authorization": "Bearer " + user.token,
            "secure_secret": user.secure_secret,
        }
    }).then((result) => {
        if (result) {
            if (result.data.error === "no-users-exist") dispatch(setUsers([]));
            else {
                let sorted = result.data.data.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;

                    return 0;
                });

                let filtered = sorted.filter((filter) => filter.uid !== user.uid);

                dispatch(setUsers(filtered));
            }
        }
    }).catch((error) => console.log(error));
}

function fetchItems() {
    let {user} = store.getState().userReducer;

    axios.get(API_URL + "/items", {
        headers: {
            "Authorization": "Bearer " + user.token,
            "secure_secret": user.secure_secret,
        }
    }).then((result) => {
        if (result.data.error === "no-items-exist") dispatch(setItems([]));
        else
            dispatch(setItems(result.data.data.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;

                return 0;
            })))
    }).catch((error) => console.log(error));
}

axios.interceptors.request.use(function (config) {
    dispatch(setLoading(true))
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response.data.error) {
        switch (response.data.error) {
            case "user-not-found":
                let no_user = {
                    title: "",
                    content: "That user was not found, please try again."
                };

                dispatch(addNotification({notification: no_user, closeAfter: 5}))
                break;
            case "password-mismatch":
                let password_mismatch = {
                    title: "",
                    content: "Incorrect password, please try again."
                };

                dispatch(addNotification({notification: password_mismatch, closeAfter: 5}))
                break;
            default:
                break;
        }
    }
    dispatch(setLoading(false))
    return response;
}, function (error) {
    console.log(error.response);

    if (error.response.data === "Unauthorized") {
        dispatch(setUser({}));
        dispatch(setUsers([]));
        dispatch(setItems([]));
    }
    return Promise.reject(error);
});

const API_URL = "https://utapi.connordavis.work";

export {
    axios,
    API_URL,
    fetchUsers,
    fetchItems
};
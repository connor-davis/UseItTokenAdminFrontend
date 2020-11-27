import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {BrowserRouter as Router} from 'react-router-dom';

import Auth from './app/pages/auth';
import Home from './app/pages/home';
import {selectUser} from './app/slices/user';
import axios from "axios";
import {setUsers} from "./app/slices/users";
import {setItems} from "./app/slices/items";
import {API_URL} from "./app/utils";

function App() {
    let dispatch = useDispatch();
    let user = useSelector(selectUser);

    useEffect(() => {
        if (user.secure_secret) {
            axios.get(API_URL + "/users/", {
                headers: {
                    "Authorization": "Bearer " + user.token,
                    "secure_secret": user.secure_secret,
                }
            }).then((result) => {
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

            }).catch((error) => console.log(error));

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
    });

    return (
        <Router>
            {
                user.uid ?
                    <Home/> :
                    <Auth/>
            }
        </Router>
    );
}

export default App;

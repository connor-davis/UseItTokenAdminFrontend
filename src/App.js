import React, {useEffect} from 'react';

import {useSelector} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {fetchItems, fetchUsers} from "./app/utils";

import Auth from './app/pages/auth';
import Home from './app/pages/home';

import {selectUser} from './app/slices/user';
import Notification from "./app/pages/components/notification";

function App() {
    let user = useSelector(selectUser);

    useEffect(() => {
        if (user.secure_secret) {
            fetchUsers();
            fetchItems()
        }
    }, [user.secure_secret]);

    return (
        <Router>
            <Notification/>
            {
                user.uid ?
                    <Home/> :
                    <Auth/>
            }
        </Router>
    );
}

export default App;

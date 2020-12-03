import React, {useEffect} from 'react';

import {useSelector} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {fetchAdmins, fetchCollectors, fetchCompanies, fetchItems} from "./app/utils";

import Auth from './app/pages/auth';
import Home from './app/pages/home';

import {selectUser} from './app/slices/user.slice.js';
import Notification from "./app/pages/components/notification";

function App() {
    let user = useSelector(selectUser);

    useEffect(() => {
        if (user.role) {
            fetchAdmins();
            fetchCompanies();
            fetchCollectors();
            fetchItems();
        }
    }, [user.role]);

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

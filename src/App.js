import React, {useEffect} from 'react';

import {useSelector} from 'react-redux';

import {HashRouter} from 'react-router-dom';

import {fetchAdmins, fetchCollectors, fetchCompanies, fetchItems} from "./app/utils";
import AuthPage from './app/pages/auth.page';
import HomePage from './app/pages/home.page';
import {selectUser} from './app/slices/user.slice.js';
import Notification from "./app/pages/components/notification";

function App() {
    let user = useSelector(selectUser);

    useEffect(() => {
        if (user.token) {
            fetchAdmins();
            fetchCompanies();
            fetchCollectors();
            fetchItems();
        }
    }, [user.token]);

    return (
        <HashRouter>
            <Notification/>
            {
                user.token ?
                    <HomePage/> :
                    <AuthPage/>
            }
        </HashRouter>
    );
}

export default App;

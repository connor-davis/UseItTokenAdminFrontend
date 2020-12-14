import React from 'react';

import ReactDOM from 'react-dom';

import io from "socket.io-client";

import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react';

import App from './App';
import './index.css';

import {persistor, store} from './app/store';
import { setAdmins } from './app/slices/admins.slice';
import { setCollectors } from './app/slices/collector.slice';
import { setCompanies } from './app/slices/company.slice';
import { setItems } from './app/slices/items.slice';

let dispatch = store.dispatch;

let socket = io("https://utapi.connordavis.work");

socket.on("connect", () => {
    console.log("Connected to SOCKET");
});

socket.on("disconnect", () => {
    console.log("Disconnected from SOCKET");
});

socket.on("admin-change", ({type, data: {_idRef, document}}) => {
    let admins = store.getState().adminsReducer.admins;

    switch (type) {
        case "insert":
            dispatch(setAdmins([...admins, document]));

            break;
        case "update":
            let updateFilter = admins.filter((filter) => filter.uid !== document.uid);
            dispatch(setAdmins([...updateFilter, document]));

            break;
        case "delete":
            let deleteFilter = admins.filter((filter) => filter.id !== _idRef);
            dispatch(setAdmins(deleteFilter));

            break;
        default:
            break;
    }
});

socket.on("company-change", ({type, data: {_idRef, document}}) => {
    let companies = store.getState().companiesReducer.companies;

    switch (type) {
        case "insert":
            dispatch(setCompanies([...companies, document]));

            break;
        case "update":
            let updateFilter = companies.filter((filter) => filter.uid !== document.uid);
            dispatch(setCompanies([...updateFilter, document]));

            break;
        case "delete":
            let deleteFilter = companies.filter((filter) => filter.id !== _idRef);
            dispatch(setCompanies(deleteFilter));

            break;
        default:
            break;
    }
});

socket.on("collector-change", ({type, data: {_idRef, document}}) => {
    let collectors = store.getState().collectorsReducer.collectors;

    switch (type) {
        case "insert":
            dispatch(setCollectors([...collectors, document]));

            break;
        case "update":
            let updateFilter = collectors.filter((filter) => filter.uid !== document.uid);
            dispatch(setCollectors([...updateFilter, document]));

            break;
        case "delete":
            let deleteFilter = collectors.filter((filter) => filter.id !== _idRef);
            dispatch(setCollectors(deleteFilter));

            break;
        default:
            break;
    }
});

socket.on("item-change", ({type, data: {_idRef, document}}) => {
    let items = store.getState().itemsReducer.items;

    switch (type) {
        case "insert":
            dispatch(setItems([...items, document]));

            break;
        case "update":
            let updateFilter = items.filter((filter) => filter.uid !== document.uid);
            dispatch(setItems([...updateFilter, document]));

            break;
        case "delete":
            let deleteFilter = items.filter((filter) => filter.id !== _idRef);
            dispatch(setItems(deleteFilter));

            break;
        default:
            break;
    }
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {itemsSlice} from "./slices/items";
import {userSlice} from "./slices/user";
import {usersSlice} from "./slices/users";

let userReducer = userSlice.reducer;
let usersReducer = usersSlice.reducer;
let itemsReducer = itemsSlice.reducer;

function loggerMiddleware(store) {
    return function (next) {
        return function (action) {
            console.log(action)
            next(action)
            console.log(store.getState())
        }
    }
}

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({userReducer, usersReducer, itemsReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({
        serializableCheck: false,
    }), loggerMiddleware]
})

let persistor = persistStore(store)

export {store, persistor};
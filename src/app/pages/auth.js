import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Route} from "react-router";
import {API_URL, axios} from "../utils";
import {setUser} from "../slices/user.slice.js";

import "../styles/auth.scss";
import "../styles/global.scss";
import {addNotification} from "../slices/notifications.slice";

function Auth({ history }) {
    let dispatch = useDispatch();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    async function authenticate() {
        await axios.post(API_URL + "/admin/authenticate", {
            email, password
        }).then((response) => {
            if (response.data.success) {
                if (response.data.data.role.name !== "admin") {
                    let notification = {
                        title: "",
                        content: "You are not authorized to log in with this application."
                    };

                    dispatch(addNotification({notification, closeAfter: 5}))
                    return;
                }

                dispatch(setUser(response.data.data));
            }
        });
    }

    return (
        <div className="auth-page">
            <div className="blur-background"/>
            <div className="auth-form">
                <Route path="/" exact>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}/>

                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(p) => setPassword(p.target.value)}/>

                    <button onClick={authenticate}>Authenticate</button>
                </Route>
            </div>
        </div>
    );
}

export default Auth;
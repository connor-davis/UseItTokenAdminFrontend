import axios from "axios";

import React, {useState} from "react";

import {useDispatch} from "react-redux";

import {Route} from "react-router";

import {setUser} from "../slices/user";
import "../styles/auth.scss";
import "../styles/global.scss";

function Auth() {
    let dispatch = useDispatch();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    async function authenticate() {
        await axios.post("http://localhost/auth/login", {
            email, password
        }).then((response) => {
            if (response.data.success) {
                window.location.href = "/";
                dispatch(setUser(response.data.data));
            }

            if (response.data.error) alert(response.data.error);
        });
    }

    return (
        <div className="auth-page">
            <div className="blur-background" />
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
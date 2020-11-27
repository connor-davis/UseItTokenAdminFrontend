import React, { useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { selectUser } from "../../slices/user";

import "../../styles/global.scss";
import "../../styles/item.scss";
import {API_URL} from "../../utils";

function CreateCompany() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let user = useSelector(selectUser);

    async function createCompany() {
        await axios.post(API_URL + "/users/", { fullname: name, email, password, userType: "company" }, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret,
            }
        }).then((response) => {
            console.log(response);
            if (response.data.success) window.location.href = "/users";
        }).catch((error) => console.log(error));
    }

    return (
        <div className="modify-item">
            <p className="title">Create Company</p>

            <input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)} />

            <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} />

            <input
                type="text"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />

            <span>
                <button onClick={createCompany}>Continue</button>
                <Link to="/users"><button>Cancel</button></Link>
            </span>
        </div>
    );
}

export default CreateCompany;
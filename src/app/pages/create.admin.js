import React, { useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { selectUser } from "../slices/user";
import "../styles/global.scss";
import "../styles/item.scss";

function CreateAdmin() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let user = useSelector(selectUser);

    async function createAdmin() {
        await axios.post("http://localhost/users/", { fullname: name, email, password, userType: "admin" }, {
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
        <div className="create-item">
            <p className="title">Create Admin</p>

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
                <button onClick={createAdmin}>Continue</button>
                <Link to="/users"><button>Cancel</button></Link>
            </span>
        </div>
    );
}

export default CreateAdmin;
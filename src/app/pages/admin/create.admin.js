import React, {useState} from "react";

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {API_URL, axios, fetchUsers} from "../../utils";

import {selectUser} from "../../slices/user";

import "../../styles/global.scss";
import "../../styles/item.scss";

function CreateAdmin({history}) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let user = useSelector(selectUser);

    async function createAdmin() {
        await axios.post(API_URL + "/users/", {fullname: name, email, password, userType: "admin"}, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret,
            }
        }).then((response) => {
            if (response.data.success) {
                fetchUsers();
                history.push("/users");
            }
        }).catch((error) => console.log(error));
    }

    return (
        <div className="modify-item">
            <p className="title">Create Admin</p>

            <input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}/>

            <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}/>

            <input
                type="text"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}/>

            <span>
                <button onClick={createAdmin}>Continue</button>
                <Link to="/users"><button>Cancel</button></Link>
            </span>
        </div>
    );
}

export default CreateAdmin;
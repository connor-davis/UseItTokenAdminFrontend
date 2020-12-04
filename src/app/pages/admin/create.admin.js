import React, {useState} from "react";

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {API_URL, axios, fetchAdmins} from "../../utils";

import {selectUser} from "../../slices/user.slice.js";

import "../../styles/global.scss";
import "../../styles/item.scss";

function CreateAdmin({history}) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let user = useSelector(selectUser);

    async function createAdmin() {
        await axios.post(API_URL + "/admin/create", {name, email, password}, {
            headers: {
                "Authorization": "Bearer " + user.token,
            }
        }).then((response) => {
            if (response.data.success) {
                fetchAdmins();
                history.goBack();
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
                <button onClick={createAdmin.bind(this)}>Continue</button>
                <Link to="/admins"><button>Cancel</button></Link>
            </span>
        </div>
    );
}

export default CreateAdmin;
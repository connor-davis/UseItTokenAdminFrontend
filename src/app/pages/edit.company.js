import React, {useEffect, useState} from "react";

import axios from "axios";

import {useSelector} from "react-redux";

import {Link, useParams} from "react-router-dom";

import {selectUser} from "../slices/user";
import "../styles/global.scss";
import "../styles/item.scss";
import {selectUsers} from "../slices/users";
import {API_URL} from "../utils";

function EditCompany() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");

    let user = useSelector(selectUser);
    let users = useSelector(selectUsers);

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            let company = users.filter((user) => {
                return id === user["uid"];
            })[0];

            setName(company.fullname);
            setEmail(company.email);
        }
    }, [id, users]);

    function editUser() {
        axios.put(API_URL + "/users/" + id, {fullname: name, email, userType: "company"}, {
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
            {name ? <div>
                <p className="title">Edit Company</p>

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

                <span>
                    <button onClick={editUser}>Continue</button>
                    <Link to="/users"><button>Cancel</button></Link>
                </span>
            </div> : "Loading..."}
        </div>
    );
}

export default EditCompany;
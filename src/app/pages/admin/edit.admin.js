import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {API_URL, axios, fetchAdmins} from "../../utils";

import {selectUser} from "../../slices/user.slice.js";

import "../../styles/global.scss";
import "../../styles/item.scss";
import {selectAdmins} from "../../slices/admins.slice";
import LoadingPage from "../loading.page";

function EditAdmin({history}) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");

    let user = useSelector(selectUser);
    let admins = useSelector(selectAdmins);

    let {uid} = useParams();

    useEffect(() => {
        if (uid) {
            let admin = admins.filter((user) => {
                return uid === user["uid"];
            })[0];

            setName(admin.name);
            setEmail(admin.email);
        }
    }, [uid, admins]);

    function editAdmin() {
        axios.put(API_URL + "/admin/" + uid, {name, email}, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret,
            }
        }).then((response) => {
            if (response.data.success) {
                fetchAdmins();
                history.goBack();
            }
        }).catch((error) => console.log(error));
    }

    return name ? <div className="modify-item">
        <p className="title">Edit Admin</p>

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
                    <button onClick={editAdmin.bind(this)}>Continue</button>
                    <Link to="/admins"><button>Cancel</button></Link>
                </span>
    </div> : <LoadingPage/>;
}

export default EditAdmin;
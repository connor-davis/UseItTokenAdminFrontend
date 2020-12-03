import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {API_URL, axios, fetchAdmins} from "../../utils";

import {selectUser} from "../../slices/user.slice.js";

import "../../styles/global.scss";
import "../../styles/item.scss";
import {selectAdmins} from "../../slices/admins.slice";

function EditAdmin({history}) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");

    let user = useSelector(selectUser);
    let admins = useSelector(selectAdmins());

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            let admin = admins.filter((user) => {
                return id === user["uid"];
            })[0];

            setName(admin.fullname);
            setEmail(admin.email);
        }
    }, [id, admins]);

    function editAdmin() {
        axios.put(API_URL + "/users/" + id, {fullname: name, email, userType: "admin"}, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret,
            }
        }).then((response) => {
            if (response.data.success) {
                fetchAdmins();
                history.push("/users");
            }
        }).catch((error) => console.log(error));
    }

    return (
        <div className="modify-item">
            {name ? <div>
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
                    <button onClick={editAdmin}>Continue</button>
                    <Link to="/admins"><button>Cancel</button></Link>
                </span>
            </div> : "Loading..."}
        </div>
    );
}

export default EditAdmin;
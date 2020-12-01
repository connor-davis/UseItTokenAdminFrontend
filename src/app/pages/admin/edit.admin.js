import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {API_URL, axios, fetchUsers} from "../../utils";

import {selectUser} from "../../slices/user";
import {selectUsers} from "../../slices/users";

import "../../styles/global.scss";
import "../../styles/item.scss";

function EditAdmin({history}) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");

    let user = useSelector(selectUser);
    let users = useSelector(selectUsers);

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            let admin = users.filter((user) => {
                return id === user["uid"];
            })[0];

            setName(admin.fullname);
            setEmail(admin.email);
        }
    }, [id, users]);

    function editUser() {
        axios.put(API_URL + "/users/" + id, {fullname: name, email, userType: "admin"}, {
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
                    <button onClick={editUser}>Continue</button>
                    <Link to="/users"><button>Cancel</button></Link>
                </span>
            </div> : "Loading..."}
        </div>
    );
}

export default EditAdmin;
import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {API_URL, axios, fetchCompanies} from "../../utils";

import {selectUser} from "../../slices/user.slice.js";

import "../../styles/global.scss";
import "../../styles/item.scss";
import {selectCompanies} from "../../slices/company.slice";

function EditCompany({history}) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");

    let user = useSelector(selectUser);
    let companies = useSelector(selectCompanies);

    let {id} = useParams();

    useEffect(() => {
        if (id) {
            let company = companies.filter((user) => {
                return id === user["uid"];
            })[0];

            setName(company.fullname);
            setEmail(company.email);
        }
    }, [id, companies]);

    function editCompany() {
        axios.put(API_URL + "/users/" + id, {fullname: name, email, userType: "company"}, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret,
            }
        }).then((response) => {
            if (response.data.success) {
                fetchCompanies();
                history.goBack();
            }
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
                    <button onClick={editCompany}>Continue</button>
                    <Link to="/companies"><button>Cancel</button></Link>
                </span>
            </div> : "Loading..."}
        </div>
    );
}

export default EditCompany;
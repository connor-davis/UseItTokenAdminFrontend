import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {API_URL, axios, fetchCompanies} from "../../utils";

import {selectUser} from "../../slices/user.slice.js";

import "../../styles/global.scss";
import "../../styles/item.scss";
import {selectCompanies} from "../../slices/company.slice";
import LoadingPage from "../loading.page";

function EditCompany({history}) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");

    let user = useSelector(selectUser);
    let companies = useSelector(selectCompanies);

    let {uid} = useParams();

    useEffect(() => {
        if (uid) {
            let company = companies.filter((user) => {
                return uid === user["uid"];
            })[0];

            setName(company.name);
            setEmail(company.email);
            setPhoneNumber(company.phoneNumber);
        }
    }, [uid, companies]);

    function editCompany() {
        axios.put(API_URL + "/company/" + uid, {name, email, phoneNumber}, {
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

    return name ? <div className="modify-item">
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

        <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}/>

        <span>
                    <button onClick={editCompany.bind(this)}>Continue</button>
                    <Link to="/companies"><button>Cancel</button></Link>
                </span>
    </div> : <LoadingPage/>;
}

export default EditCompany;
import React, {useState} from "react";

import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {API_URL, axios, fetchCompanies} from "../../utils";

import {selectUser} from "../../slices/user.slice.js";

import "../../styles/global.scss";
import "../../styles/item.scss";

function CreateCompany({history}) {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [password, setPassword] = useState("");

    let user = useSelector(selectUser);

    async function createCompany() {
        if (name !== "" && email !== "" && phoneNumber !== "" && password !== "") {
            await axios.post(API_URL + "/company/create", {name, email, phoneNumber, password}, {
                headers: {
                    "Authorization": "Bearer " + user.token,
                    "secure_secret": user.secure_secret,
                }
            }).then((response) => {
                console.log(response);
                if (response.data.success) {
                    fetchCompanies();
                    history.goBack();
                }
            }).catch((error) => console.log(error));
        }
    }

    return (
        <div className="modify-item">
            <p className="title">Create Company</p>

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

            <input
                type="text"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}/>

            <span>
                <button onClick={createCompany.bind(this)}>Continue</button>
                <Link to="/companies"><button>Cancel</button></Link>
            </span>
        </div>
    );
}

export default CreateCompany;
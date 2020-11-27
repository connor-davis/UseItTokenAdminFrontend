import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";

import {useParams} from "react-router";

import {selectUsers} from "../slices/users";
import "../styles/global.scss";
import "../styles/user.info.scss";

function UserInfo() {
    let users = useSelector(selectUsers);
    let [user, setUser] = useState({});
    let {id} = useParams();

    useEffect(() => {
        let u = users.filter((u) => u.uid === id)[0];
        setUser(u);
    }, [users, id]);

    return (
        <div className="user-info-page">
            {
                user ?
                    <table className="user-info-card">
                        <thead>
                        <tr>
                            <th className="user-fullname">{user.fullname}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="user-email">Email: {user.email}</td>
                        </tr>
                        <tr>
                            <td className="user-type">User Type: {user.userType}</td>
                        </tr>
                        </tbody>
                    </table> : ""
            }
        </div>
    );
}

export default UserInfo;
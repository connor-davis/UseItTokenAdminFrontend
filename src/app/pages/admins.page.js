import React from "react";

import {MdDelete, MdEdit,} from "react-icons/md";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {API_URL, axios, fetchAdmins} from "../utils";
import {selectUser} from "../slices/user.slice";
import {selectAdmins} from "../slices/admins.slice";


function AdminsPage() {
    let user = useSelector(selectUser);
    let admins = useSelector(selectAdmins);

    function deleteAdmin(uid) {
        axios.delete(API_URL + "/admin/" + uid, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret
            }
        }).then((result) => {
            if (result.data.success) fetchAdmins()
        }).catch((error) => console.log(error));
    }

    return (
        <div className="users-page">
            <div className="header">
                <div className="header-block">Admins</div>
                <div className="header-block">
                    <Link to="/createAdmin">
                        <button>Create New</button>
                    </Link>
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th style={{width: "30%"}}>Name</th>
                    <th style={{width: "55%"}}>Email</th>
                    <th style={{width: "10%"}}/>
                </tr>
                </thead>
                <tbody>
                {admins.map((user, index) => (
                    <tr key={index}>
                        <td style={{width: "5%"}}>{index + 1}</td>
                        <td style={{width: "25%"}}>{user.name}</td>
                        <td style={{width: "45%"}}>{user.email}</td>
                        <td style={{width: "10%"}}>
                            <Link to={{
                                pathname: "/editAdmin/" + user.uid,
                            }}>
                                <button><MdEdit/></button>
                            </Link>
                            <button onClick={deleteAdmin.bind(this, user.uid)}><MdDelete/></button>
                        </td>
                    </tr>))}
                </tbody>
            </table>

            {admins.length === 0 ?
                <div
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        marginBottom: "20px",
                        fontSize: "15px",
                        background: "rgba(0, 0, 0, 0.3)"
                    }}>No Admins</div> :
                <div
                    style={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}/>
            }
        </div>
    );
}

export default AdminsPage;
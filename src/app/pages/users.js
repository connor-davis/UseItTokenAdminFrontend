import React from "react";

import {MdDelete, MdEdit,} from "react-icons/md";
import {FaBuilding, FaCrown, FaUser} from "react-icons/fa";

import {useSelector} from "react-redux";

import {Link} from "react-router-dom";

import axios from "axios";

import {selectUser} from "../slices/user";
import {selectUsers} from "../slices/users";
import {API_URL} from "../utils";

function Users() {
    let user = useSelector(selectUser);
    let users = useSelector(selectUsers);

    function deleteUser(id) {
        axios.delete(API_URL + "/users/" + id, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret
            }
        }).then((result) => {
            if (result.data.success) window.location.reload();
        }).catch((error) => console.log(error));
    }

    function type(param) {
        switch (param) {
            case 'admin':
                return (<FaCrown/>);
            case 'company':
                return (<FaBuilding/>);
            case 'collector':
                return (<FaUser/>);
            default:
                return "";
        }
    }

    return (
        <div className="users-page">
            <div className="header">
                <div className="header-block">Users</div>
                <div className="header-block">
                    <Link to="/createAdmin">
                        <button>Create Admin</button>
                    </Link>
                    <Link to="/createCompany">
                        <button>Create Company</button>
                    </Link>
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th style={{width: "25%"}}>Full Name</th>
                    <th style={{width: "45%"}}>Email</th>
                    <th style={{width: "15%"}}>Type</th>
                    <th style={{width: "10%"}}/>
                </tr>
                </thead>
                <tbody>
                {users !== {} ? users.filter((user) => user.userType === "admin").map((user, index) => (<tr key={index}>
                    <td style={{width: "5%"}}>{index + 1}</td>
                    <td style={{width: "25%"}}>{user.fullname}</td>
                    <td style={{width: "45%"}}>{user.email}</td>
                    {/* <td style={{ width: "10%" }}>{user.balance}</td> */}
                    <td style={{width: "15%"}}>{type(user.userType)}</td>
                    <td style={{width: "10%"}}>
                        <Link to={{
                            pathname: "/editAdmin/" + user.uid,
                        }}>
                            <button><MdEdit/></button>
                        </Link>
                        <button onClick={deleteUser.bind(this, user.uid)}><MdDelete/></button>
                    </td>
                </tr>)) : ""}
                </tbody>
            </table>

            {users.filter((user) => user.userType === "admin").length === 0 ?
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

            <table>
                <thead>
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th style={{width: "25%"}}>Full Name</th>
                    <th style={{width: "45%"}}>Email</th>
                    <th style={{width: "15%"}}>Type</th>
                    <th style={{width: "10%"}}/>
                </tr>
                </thead>
                <tbody>
                {users !== {} ? users.filter((user) => user.userType === "company").map((user, index) => (
                    <tr key={index}>
                        <td style={{width: "5%"}}>{index + 1}</td>
                        <td style={{width: "25%"}}>{user.fullname}</td>
                        <td style={{width: "35%"}}>{user.email}</td>
                        <td style={{width: "15%"}}>{type(user.userType)}</td>
                        <td style={{width: "10%"}}>
                            <Link to={{
                                pathname: "/editCompany/" + user.uid,
                            }}>
                                <button><MdEdit/></button>
                            </Link>
                            <button onClick={deleteUser.bind(this, user.uid)}><MdDelete/></button>
                        </td>
                    </tr>)) : ""}
                </tbody>
            </table>

            {users.filter((user) => user.userType === "company").length === 0 ?
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
                    }}>No Companies</div> :
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

            <table>
                <thead>
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th style={{width: "25%"}}>Full Name</th>
                    <th style={{width: "35%"}}>Email</th>
                    <th style={{width: "10%"}}>Balance</th>
                    <th style={{width: "15%"}}>Type</th>
                    <th style={{width: "10%"}}/>
                </tr>
                </thead>
                <tbody>
                {users !== {} ?
                    users.filter((user) => user.userType === "collector").map((user, index) => (
                        <tr key={index}>
                            <td style={{width: "5%"}}>{index + 1}</td>
                            <td style={{width: "25%"}}>{user.fullname}</td>
                            <td style={{width: "35%"}}>{user.email}</td>
                            <td style={{width: "10%"}}>{user.balance}</td>
                            <td style={{width: "15%"}}>{type(user.userType)}</td>
                            <td style={{width: "10%"}}>
                                {/* <Link to={{
                                        pathname: "/userInfo/" + user.uid,
                                    }}><button><FaInfo /></button></Link> */}
                                <button onClick={deleteUser.bind(this, user.uid)}><MdDelete/></button>
                            </td>
                        </tr>)) : ""}
                </tbody>
            </table>

            {users.filter((user) => user.userType === "collector").length === 0 ?
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
                    }}>No Collectors</div> :
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

export default Users;
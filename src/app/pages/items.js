import React from "react";

import {useSelector} from "react-redux";

import {Link} from "react-router-dom";

import axios from "axios";

import {MdDelete, MdEdit} from "react-icons/md";

import {selectItems} from "../slices/items";
import {selectUser} from "../slices/user";

function Items() {
    let user = useSelector(selectUser);
    let items = useSelector(selectItems);

    function deleteItem({id}) {
        axios.delete("http://localhost/items/" + id, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret
            }
        }).then((result) => {
            if (result.data.success) window.location.reload();
        }).catch((error) => console.log(error));
    }

    return (
        <div>
            <div className="header">
                <div className="header-block">Items</div>

                <div className="header-block">
                    <Link to="/createItem">
                        <button>Create Item</button>
                    </Link>
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Material</th>
                </tr>
                </thead>
                <tbody>
                {
                    items !== {} ?
                        items.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td style={{width: "100px"}}>
                                    <Link to={{
                                        pathname: "/editItem/" + item.id,
                                    }}>
                                        <button><MdEdit/></button>
                                    </Link>
                                    <button onClick={deleteItem.bind(this, {id: item.id})}><MdDelete/></button>
                                </td>
                            </tr>
                        )) :
                        ""
                }
                </tbody>
            </table>

            {items.length === 0 ?
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
                    }}>No Items</div> :
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

export default Items;
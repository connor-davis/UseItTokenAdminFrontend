import React, {useEffect, useState} from "react";

import axios from "axios";

import {useSelector} from "react-redux";

import {Link} from "react-router-dom";

import {selectItems} from "../slices/items";
import {selectUser} from "../slices/user";
import "../styles/global.scss";
import "../styles/item.scss";
import {API_URL} from "../utils";

function EditItem({match}) {
    let [name, setName] = useState("");
    let [itemValue, setItemValue] = useState(0);
    let [category, setCategory] = useState("");

    let user = useSelector(selectUser);
    let items = useSelector(selectItems);

    let {id} = match.params;

    useEffect(() => {
        if (id) {
            let item = items.filter((item) => {
                return id === item["id"];
            })[0];

            setName(item.name);
            setItemValue(item.price);
            setCategory(item.category);
        }
    }, [id, items]);

    function editItem() {
        axios.put(API_URL + "/items/" + id, {name, price: itemValue, category}, {
            headers: {
                "Authorization": "Bearer " + user.token,
                "secure_secret": user.secure_secret,
            }
        }).then((response) => {
            console.log(response);
            if (response.data.success) window.location.href = "/items";
        }).catch((error) => console.log(error));
    }

    return (
        <div className="modify-item">
            {name ? <div>
                <p className="title">Edit Product</p>

                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}/>

                <input
                    type="number"
                    name="value"
                    value={itemValue}
                    placeholder="Item Value"
                    onChange={(e) => {
                        if (e.target.value >= 0) setItemValue(e.target.value)
                    }}/>

                <input
                    type="text"
                    name="material"
                    value={category}
                    placeholder="Material"
                    onChange={(e) => setCategory(e.target.value)}/>

                <span>
                    <button onClick={editItem}>Continue</button>
                    <Link to="/items"><button>Cancel</button></Link>
                </span>
            </div> : "Loading..."}
        </div>
    );
}

export default EditItem;
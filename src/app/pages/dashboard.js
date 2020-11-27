import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";

import {selectItems} from "../slices/items";
import {selectUser} from "../slices/user";
import {selectUsers} from "../slices/users";
import "../styles/dashboard.scss";
import "../styles/global.scss";

function Dashboard() {
    let user = useSelector(selectUser);
    let items = useSelector(selectItems);
    let users = useSelector(selectUsers);

    let [countAdmins, setCountAdmins] = useState(0);
    let [countCompanies, setCountCompanies] = useState(0);
    let [countCollectors, setCountCollectors] = useState(0);
    let [countItems, setCountItems] = useState(0);

    useEffect(() => {
        let admins = users.filter((user) => user.userType === "admin");
        setCountAdmins(admins.length);

        let companies = users.filter((user) => user.userType === "company");
        setCountCompanies(companies.length);

        let collectors = users.filter((user) => user.userType === "collector");
        setCountCollectors(collectors.length);

        setCountItems(items.length);
    }, [user, users, items]);

    return (
        <div className="dashboard-page">
            <div className="header">
                <div className="header-block">Dashboard</div>
            </div>

            <div className="row">
                <div className="stat-block">
                    <div className="stat-block-title">Admins</div>
                    <div className="stat-block-content">{countAdmins}</div>
                </div>

                <div className="stat-block">
                    <div className="stat-block-title">Companies</div>
                    <div className="stat-block-content">{countCompanies}</div>
                </div>

                <div className="stat-block">
                    <div className="stat-block-title">Collectors</div>
                    <div className="stat-block-content">{countCollectors}</div>
                </div>

                <div className="stat-block">
                    <div className="stat-block-title">Items</div>
                    <div className="stat-block-content">{countItems}</div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
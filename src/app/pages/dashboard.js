import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";

import {selectItems} from "../slices/items.slice";
import {selectUser} from "../slices/user.slice.js";
import "../styles/dashboard.scss";
import "../styles/global.scss";
import {selectAdmins} from "../slices/admins.slice";
import {selectCompanies} from "../slices/company.slice";
import {selectCollectors} from "../slices/collector.slice";

function Dashboard() {
    let user = useSelector(selectUser);
    let items = useSelector(selectItems);
    let admins = useSelector(selectAdmins);
    let companies = useSelector(selectCompanies);
    let collectors = useSelector(selectCollectors);

    let [countAdmins, setCountAdmins] = useState(0);
    let [countCompanies, setCountCompanies] = useState(0);
    let [countCollectors, setCountCollectors] = useState(0);
    let [countItems, setCountItems] = useState(0);

    useEffect(() => {
        setCountAdmins(admins.length);
        setCountCompanies(companies.length);
        setCountCollectors(collectors.length);

        setCountItems(items.length);
    }, [user, admins, companies, collectors, items]);

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
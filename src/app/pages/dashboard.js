import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { selectAdmins } from "../slices/admins.slice";
import { selectCollectors } from "../slices/collector.slice";
import { selectCompanies } from "../slices/company.slice";
import { selectItems } from "../slices/items.slice";
import { selectUser } from "../slices/user.slice.js";
import "../styles/dashboard.scss";
import "../styles/global.scss";

const ChartTooltip = ({ active, payload, label }) => {
    if (active) {
        if (payload !== null) {
            if (payload.length > 1) {
                return (
                    <div className="chart-tooltip">
                        {/* <p className="chart-tooltip-label">{payload[0].payload.name}</p> */}
                        <div className="chart-tooltip-content">
                            {payload.map((p) => (<div key={p.color} style={{ color: p.color }}>{p.name + ": " + p.value}</div>))}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="chart-tooltip">
                        <p className="chart-tooltip-label">{payload[0].name + ": " + payload[0].value}</p>
                    </div>
                );
            }
        }
    }

    return null;
};

function totalNums(array, cb) {
    let totals = [];

    for (let i = 0; i < array.length; i++) {
        let dates = `${array[i].createdOn.split(" ")[1] + array[i].createdOn.split(" ")[3]}`;

        if (!totals[dates]) {
            totals[dates] = [];
        }

        totals[dates].push(array[i]);
    }

    cb(totals);
}

function usersMonthly(array, cb) {
    let monthly = [];
    let i = 0;

    for (let total in array) {
        monthly[i] = { name: total, Total: array[total].length };
        i++;
    }

    cb(monthly);
}

function itemsMonthly(array, cb) {
    let monthly = [];
    let HDP = [];
    let LDP = [];
    let i = 0;

    for (let total in array) {
        for (let e = 0; e < array[total].length; e++) {
            switch (array[total][e].category) {
                case "HDP":
                    HDP = [...array[total].filter((filter) => filter.category === "HDP")];
                    break;
                case "LDP":
                    LDP = [...array[total].filter((filter) => filter.category === "LDP")];
                    break;
                default:
                    break;
            }
        }

        monthly[i] = { name: total, HDP: HDP.length, LDP: LDP.length, total: array[total].length };
        i++;
    }

    cb(monthly);
}

function Dashboard() {
    let user = useSelector(selectUser);
    let items = useSelector(selectItems);
    let admins = useSelector(selectAdmins);
    let companies = useSelector(selectCompanies);
    let collectors = useSelector(selectCollectors);

    let [dataCompanies, setDataCompanies] = useState([]);
    let [dataCollectors, setDataCollectors] = useState([]);
    let [dataItems, setDataItems] = useState([]);
    let [countAdmins, setCountAdmins] = useState(0);
    let [countCompanies, setCountCompanies] = useState(0);
    let [countCollectors, setCountCollectors] = useState(0);
    let [countItems, setCountItems] = useState(0);

    useEffect(() => {
        if (companies !== null && companies.length > 0) {
            let totals = [];
            totalNums(companies, val => totals = val);

            let monthly = [];
            usersMonthly(totals, val => monthly = val);

            setDataCompanies(monthly);
        }

        if (collectors !== null && collectors.length > 0) {
            let totals = [];
            totalNums(collectors, val => totals = val);

            let monthly = [];
            usersMonthly(totals, val => monthly = val);

            setDataCollectors(monthly);
        }

        if (items !== null && items.length > 0) {
            console.log(items);
            
            let totals = [];
            totalNums(items, val => totals = val);

            let monthly = [];
            itemsMonthly(totals, val => monthly = val);

            setDataItems(monthly);
        }

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

            <div className="row">
                <div className="stat-block">
                    <div className="stat-block-title">Monthly Companies</div>
                    <div className="stat-block-content">
                        <LineChart
                            width={600}
                            height={300}
                            data={dataCompanies}
                            margin={{
                                top: 5, right: 5, left: 5, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey="Total" />
                            <Tooltip content={<ChartTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="Total" stroke="#95d2ac" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>
                </div>

                <div className="stat-block">
                    <div className="stat-block-title">Monthly Collectors</div>
                    <div className="stat-block-content">
                        <LineChart
                            width={600}
                            height={300}
                            data={dataCollectors}
                            margin={{
                                top: 5, right: 5, left: 5, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey="Total" />
                            <Tooltip content={<ChartTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="Total" stroke="#95d2ac" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>
                </div>

                <div className="stat-block">
                    <div className="stat-block-title">Monthly Items</div>
                    <div className="stat-block-content">
                        <LineChart
                            width={600}
                            height={300}
                            data={dataItems}
                            margin={{
                                top: 5, right: 5, left: 5, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey="total" />
                            <Tooltip content={<ChartTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="HDP" stroke="#F4D03F" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="LDP" stroke="#27AE60" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
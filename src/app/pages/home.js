import React from "react";

import {VscOrganization, VscPackage} from "react-icons/vsc";

import {Link, Route, Switch} from "react-router-dom";

import {persistor} from "../store";
import "../styles/global.scss";
import "../styles/home.scss";

import CreateItem from "./create.item";
import EditItem from "./edit.item";
import Items from "./items";
import Users from "./users";
import CreateCompany from "./create.company";
import NotFound from "./not.found";
import CreateAdmin from "./create.admin";
import Dashboard from "./dashboard";
import {MdDashboard} from "react-icons/md";
import UserInfo from "./user.info";
import EditCompany from "./edit.company";
import EditAdmin from "./edit.admin";

function Home() {
    function logout() {
        persistor.purge().then(r => console.log(r));
        window.location.href = "/";
    }

    return (
        <div className="home-page">
            <div className="blur-background"/>
            <div className="home-sidebar">
                <div className="sidebar-title">Admin Panel</div>
                <div className="sidebar-content">
                    <ul className="sidebar-list">
                        <Link to="/">
                            <div className="sidebar-list-item">
                                <MdDashboard/>
                                <p>Dashboard</p>
                            </div>
                        </Link>
                        <Link to="/users">
                            <div className="sidebar-list-item">
                                <VscOrganization/>
                                <p>Users</p>
                            </div>
                        </Link>
                        <Link to="/items">
                            <div className="sidebar-list-item">
                                <VscPackage/>
                                <p>Items</p>
                            </div>
                        </Link>
                    </ul>
                </div>
                <div className="sidebar-footer">
                    <button onClick={logout} className="block">Logout</button>
                </div>
            </div>
            <div className="home-content">
                <Switch>
                    <Route path="/" exact><Dashboard/></Route>
                    <Route path="/users"><Users/></Route>
                    <Route path="/items"><Items/></Route>
                    <Route path="/userInfo/:id"><UserInfo/></Route>
                    <Route path="/createAdmin"><CreateAdmin/></Route>
                    <Route path="/createCompany"><CreateCompany/></Route>
                    <Route path="/createItem"><CreateItem/></Route>
                    <Route path="/editAdmin/:id"><EditAdmin/></Route>
                    <Route path="/editCompany/:id"><EditCompany/></Route>
                    <Route path="/editItem/:id"><EditItem/></Route>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </div>
    );
}

export default Home;
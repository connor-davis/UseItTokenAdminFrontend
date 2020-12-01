import React from "react";

import {VscOrganization, VscPackage} from "react-icons/vsc";
import {Link, Route, Switch} from "react-router-dom";
import {persistor} from "../store";
import {MdDashboard} from "react-icons/md";
import {useSelector} from "react-redux";

import {selectLoading} from "../slices/loading";

import "../styles/global.scss";
import "../styles/home.scss";

import CreateItem from "./item/create.item";
import EditItem from "./item/edit.item";
import Items from "./items";
import Users from "./users";
import CreateCompany from "./company/create.company";
import NotFound from "./not.found";
import CreateAdmin from "./admin/create.admin";
import Dashboard from "./dashboard";
import UserInfo from "./user.info";
import EditCompany from "./company/edit.company";
import EditAdmin from "./admin/edit.admin";
import Loading from "./loading";

function Home() {
    let loading = useSelector(selectLoading);

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
                {!loading ? <Switch>
                    <Route path="/" exact><Dashboard/></Route>
                    <Route path="/users"><Users/></Route>
                    <Route path="/items"><Items/></Route>
                    <Route path="/userInfo/:id"><UserInfo/></Route>
                    <Route path="/createAdmin" component={(props) => <CreateAdmin {...props} />}/>
                    <Route path="/createCompany" component={(props) => <CreateCompany {...props} />}/>
                    <Route path="/createItem" component={(props) => <CreateItem {...props} />}/>
                    <Route path="/editAdmin/:id" component={(props) => <EditAdmin {...props} />}/>
                    <Route path="/editCompany/:id" component={(props) => <EditCompany {...props} />}/>
                    <Route path="/editItem/:id" component={(props) => <EditItem {...props} />}/>
                    <Route component={NotFound}/>
                </Switch> : <Loading/>}
            </div>
        </div>
    );
}

export default Home;
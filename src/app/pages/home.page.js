import React from "react";

import {VscOrganization} from "react-icons/vsc";

import {Link, Route, Switch} from "react-router-dom";

import {MdDashboard} from "react-icons/md";

import {useSelector} from "react-redux";

import {persistor} from "../store";
import {selectLoading} from "../slices/loading.slice";
import "../styles/global.scss";
import "../styles/home.scss";

import AdminsPage from "./admins.page";
import CompaniesPage from "./companies.page";
import Dashboard from "./dashboard";
import LoadingPage from "./loading.page";
import NotFoundPage from "./not.found.page";

import CreateAdmin from "./admin/create.admin";
import EditAdmin from "./admin/edit.admin";
import CreateCompany from "./company/create.company";
import EditCompany from "./company/edit.company";

function HomePage() {
    let loading = useSelector(selectLoading);

    function logout() {
        persistor.purge().then(r => console.log(r));
        window.location.reload();
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
                        <Link to="/admins">
                            <div className="sidebar-list-item">
                                <VscOrganization/>
                                <p>Admins</p>
                            </div>
                        </Link>
                        <Link to="/companies">
                            <div className="sidebar-list-item">
                                <VscOrganization/>
                                <p>Companies</p>
                            </div>
                        </Link>
                    </ul>
                </div>
                <div className="sidebar-footer">
                    <button onClick={logout.bind(this)} className="block">Logout</button>
                </div>
            </div>
            <div className="home-content">
                {!loading ? <Switch>
                    <Route path="/" exact><Dashboard/></Route>
                    <Route path="/admins" component={(props) => <AdminsPage {...props}/>}/>
                    <Route path="/companies" component={(props) => <CompaniesPage {...props} />}/>
                    <Route path="/createAdmin" component={(props) => <CreateAdmin {...props} />}/>
                    <Route path="/createCompany" component={(props) => <CreateCompany {...props} />}/>
                    <Route path="/editAdmin/:uid" component={(props) => <EditAdmin {...props} />}/>
                    <Route path="/editCompany/:uid" component={(props) => <EditCompany {...props} />}/>
                    <Route component={NotFoundPage}/>
                </Switch> : <LoadingPage/>}
            </div>
        </div>
    );
}

export default HomePage;
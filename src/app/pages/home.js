import React from "react";

import {VscOrganization} from "react-icons/vsc";
import {Link, Route, Switch} from "react-router-dom";
import {persistor} from "../store";
import {MdDashboard} from "react-icons/md";
import {useSelector} from "react-redux";

import {selectLoading} from "../slices/loading.slice";

import "../styles/global.scss";
import "../styles/home.scss";
import AdminsPage from "./admins.page";
import CreateCompany from "./company/create.company";
import NotFound from "./not.found";
import CreateAdmin from "./admin/create.admin";
import Dashboard from "./dashboard";
import EditCompany from "./company/edit.company";
import EditAdmin from "./admin/edit.admin";
import Loading from "./loading";
import CompaniesPage from "./companies.page";

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
                    <button onClick={logout} className="block">Logout</button>
                </div>
            </div>
            <div className="home-content">
                {!loading ? <Switch>
                    <Route path="/" exact><Dashboard/></Route>
                    <Route path="/admins" component={(props) => <AdminsPage {...props}/>}/>
                    <Route path="/companies" component={(props) => <CompaniesPage {...props} />}/>
                    <Route path="/createAdmin" component={(props) => <CreateAdmin {...props} />}/>
                    <Route path="/createCompany" component={(props) => <CreateCompany {...props} />}/>
                    <Route path="/editAdmin/:id" component={(props) => <EditAdmin {...props} />}/>
                    <Route path="/editCompany/:id" component={(props) => <EditCompany {...props} />}/>
                    <Route component={NotFound}/>
                </Switch> : <Loading/>}
            </div>
        </div>
    );
}

export default Home;
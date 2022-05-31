import React, { Component, Fragment } from "react";
import {  BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
// City-related
import City from "../pages/Cities/City";
import Cities from "../pages/Cities/Cities";
// Property-related
import Property from "../pages/properties/Property";
import Properties from "../pages/properties/Properties";
// Registration
import Login from "../pages/Registration/Login";
import Signup from "../pages/Registration/Signup";
// Profile
import UserProfile from "../pages/Users/UserProfile";
// import Logout from "../pages/Registration/Logout";

export default class MainNavigation extends Component{
    constructor(props){
        super(props);
        this.state = {
            isAuth: false
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true
            })
        }
    }

    handleLogout = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.clear();
                window.location.replace('http://127.0.0.1:8000/login');
            });
    }

    render(){
        const { isAuth } = this.state;

        return(
            <Router>
                <header>
                    <nav>
                        <ul>
                            {isAuth === true ? (
                                <Fragment>
                                    {' '}
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/logout" onClick={this.handleLogout}>Logout</Link>
                                    </li>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {' '}
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">Signup</Link>
                                    </li>
                                </Fragment>
                            )}
                            <br></br>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/cities">Cities</Link>
                            </li>
                            <li>
                                <Link to="/properties">Properties</Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <Routes>
                    {/* <Route exact path="/logout" element={<Logout/>}></Route> */}
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/signup" element={<Signup />}></Route>
                    <Route exact path="/profile" element={<UserProfile />}></Route>
                    <Route exact path="/cities" element={<Cities />}></Route>
                    <Route exact path="/cities/:slug" element={<City />}></Route>
                    <Route exact path="/properties" element={<Properties />}></Route>
                    <Route exact path="/properties/:id/:slug" element={<Property />}></Route>
                    <Route exact path="/about" element={<About />}></Route>
                    <Route exact path="/" element={<Home />}></Route>
                </Routes>
            </Router>
        )
    }
}
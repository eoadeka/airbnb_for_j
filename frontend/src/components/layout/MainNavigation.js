import React, { Component } from "react";
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
import Register from "../pages/Registration/Register";
// Profile
import UserProfile from "../pages/Users/UserProfile";

export default class MainNavigation extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Router>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
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

                {/* Route will look though its children <Routes> and render th first on that matches the current URL */}
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/register" element={<Register />}></Route>
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
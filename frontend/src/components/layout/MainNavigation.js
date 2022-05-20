import React, { Component } from "react";
import {  BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cities from "../pages/Cities/Cities";
import About from "../pages/About";
import Properties from "../pages/properties/Properties";
import Property from "../pages/properties/Property";
import City from "../pages/Cities/City";

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
                    <Route exact path="/cities" element={<Cities />}></Route>
                    <Route exact path="/cities/:slug" element={<City />}></Route>
                    <Route exact path="/about" element={<About />}></Route>
                    <Route exact path="/properties" element={<Properties />}></Route>
                    <Route exact path="/properties/:id/:slug" element={<Property />}></Route>
                    <Route exact path="/" element={<Home />}></Route>
                </Routes>
            </Router>
        )
    }
}
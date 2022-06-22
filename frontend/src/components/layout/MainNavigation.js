import React, { Component, Fragment } from "react";
import {  BrowserRouter as Router, Link, Navigate, Route, Routes } from "react-router-dom";
import ErrorPage from "../pages/404";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
// City-related
import City from "../pages/Cities/City";
import Cities from "../pages/Cities/Cities";
// Property-related
import Amenities from "../pages/Amenities";
import Property from "../pages/properties/Property";
import Properties from "../pages/properties/Properties";
// Registration
import Login from "../pages/Registration/Account/Login";
import Signup from "../pages/Registration/Account/Signup";
// Profile
import UserProfile from "../pages/Users/UserProfile";
// import Logout from "../pages/Registration/Logout";
// Admin
import Admin from "../pages/Admin/Admin";
import DeactivateUserAccount from "../pages/Users/DeactivateUserAccount";
import PasswordReset from "../pages/Registration/Password/PasswordReset";
import PasswordResetConfirm from "../pages/Registration/Password/PasswordResetConfirm";
import PasswordChange from "../pages/Registration/Password/PasswordChange";
import Payment from "../pages/Reservation/Payment";
import CancelReservation from "../pages/Reservation/CancelReservation";
import PaymentConfirmation from "../pages/Reservation/PaymentConfirmation";

export default class MainNavigation extends Component{
    constructor(props){
        super(props);
        this.state = {
            isAuth: false,
            avatar: '',
            first_name: '',
            last_name: ''
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true,
            });
            fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
            // fetch('http://127.0.0.1:8000/api/users/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    avatar: data.avatar,
                    first_name: data.first_name,
                })
            });
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
        const { isAuth, avatar, first_name } = this.state;

        return(
            <Router>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about-us">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact-us">Contact</Link>
                            </li>
                            <li>
                                <Link to="/cities">Cities</Link>
                            </li>
                            <li>
                                <Link to="/properties">Properties</Link>
                            </li>
                            <li>
                                <Link to="/payment">Reservation</Link>
                            </li>

                            <li>
                                <Link to="/loose/admin">Admin</Link>
                            </li>

                            {isAuth === true ? (
                                <Fragment>
                                    {' '}
                                    <li>
                                        {/* <Link to="/user/profile" className="nav_profile"><span><img src={avatar} alt={first_name} className="nav_pic"></img></span> <span>Profile</span></Link> */}
                                        <Link to="/user/profile" className="nav_profile"><span><img src="../../static/default.png" alt={first_name} className="nav_pic"></img></span> <span>Profile</span></Link>
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
                        </ul>
                    </nav>
                </header>

                <Routes>
                    <Route exact path="/loose/admin" element={<Admin />}></Route>
                    
                    <Route exact path="/payment/" element={<Payment />}></Route>
                    <Route exact path="/payment/confirmation" element={<PaymentConfirmation />}></Route>
                    <Route exact path="/cancel-reservation/" element={<CancelReservation />}></Route>

                    {/* <Route exact path="/logout" element={<Logout/>}></Route> */}
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/signup" element={<Signup />}></Route>
                    <Route exact path="/user/password-change" element={<PasswordChange />}></Route>
                    <Route exact path="/user/password-reset" element={<PasswordReset />}></Route>
                    <Route exact path="/user/password-reset-confirm" element={<PasswordResetConfirm />}></Route>

                    <Route exact path="/user/profile" element={<UserProfile />}></Route>
                    <Route path="/user/deactivate" element={<DeactivateUserAccount />}></Route>

                    <Route exact path="/cities" element={<Cities />}></Route>
                    <Route path="/cities/:slug" element={<City />}></Route>
                    <Route exact path="/amenities" element={<Amenities />}></Route>
                    <Route exact path="/properties" element={<Properties />}></Route>
                    <Route path="/properties/:slug/:id" element={<Property />}></Route>
                    <Route exact path="/contact-us" element={<Contact />}></Route>
                    <Route exact path="/about-us" element={<About />}></Route>
                    <Route exact path="/" element={<Home />}></Route>

                    <Route path="*" element={<ErrorPage />}></Route>
                    {/* <Navigate to='/404'/> */}
                </Routes>
            </Router>
        )
    }
}
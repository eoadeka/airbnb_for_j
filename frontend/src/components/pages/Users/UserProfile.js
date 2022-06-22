import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            user: '',
            email: '',
            first_name: '',
            last_name: '',
            avatar: '',
            loading: true,
            formShowing: true,
            booking: [],

            newFirstName : '',
            newLastName : '',
        }
        // console.log(this.state.formShowing)

        this.showUpdateForm = this.showUpdateForm.bind(this);
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } else {
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
                    user: data.id,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar,
                    loading: false
                })
            });
        }

        this.showReservations();

        // window.sessionStorage.setItem("formShowing", this.state.formShowing);
    }

    componentDidUpdate(){

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    async showReservations(){
        axios
            .get("/api/bookings/")
            .then((res) => this.setState({ booking: res.data }))
            .catch((err) => console.log(err));   
    }

    formatUser(user){
        return user.first_name + ' ' + user.last_name;
    }

    showUpdateForm = () => {
        this.setState(prevState => ({
            formShowing: !prevState.formShowing
        }));
    }

    
    render(){
        const { booking, email, first_name, last_name, loading, formShowing, user } = this.state;
        const { newFirstName, newLastName } = this.state;
        
        return(
            <div>
                { loading === false && (
                    <Fragment>
                        <main>
                            <Link to={{ pathname: `/user/deactivate` }} style={{ position: "absolute", top: "6em", right: "1.5em"}}>Deactivate</Link>
                            <Link to={{ pathname: `/user/password-change` }} style={{ position: "absolute", top: "10em", right: "1.5em"}}>Change Password</Link>
                            {/* <h1>User Profile</h1> */}
                            <h1>Hello, {first_name}</h1>
                            <button type="button" onClick={this.showUpdateForm} style={{ position: 'absolute', right: "0"}}>{ formShowing ? 'Edit' : 'Close'}</button>
                            <p>Fullname: {this.formatUser(this.state)}</p>
                            <p>Email: {email}</p>
                            {/* <img src={avatar} alt={first_name} className="profile_pic"></img> */}
                            <img src="../../static/default.png" alt={first_name} className="profile_pic"></img>
                        </main>   

                        <section style={{ position: 'absolute', right: "0", textAlign: "right"}}>
                            { formShowing ? (
                                ''
                            ) : (
                                <form>
                                    <h4 style={{fontFamily: "'Syne', sans-serif", fontSize: "2em"}}>Update  Form</h4>
                                    <input type="text"  value={newFirstName} name="newFirstName" onChange={this.handleChange} placeholder="First Name" style={{backgroundColor: "white"}} />
                                    <br></br>
                                    <input type="text"  value={newLastName} name="newLastName" onChange={this.handleChange} placeholder="Last Name" style={{backgroundColor: "white"}} />
                                    <br></br>
                                    <input type="submit" value="Update"></input>
                                </form> 
                            )}
                        </section>

                        <br></br>
                        <hr></hr>
                        <br></br>

                        <section>
                        {booking.filter((booking) => booking.user == user).map((booking,  index) => (
                            
                            <div key={index}>
                                <h2>Your Reservation</h2>
                                <h3>{booking.get_property_title}</h3>
                                <img src={booking.get_property_image} alt={booking.get_property_title} width="100%" height="500px"></img>

                                <p>from <b>{booking.check_in}</b> to <b>{booking.check_out}</b></p>
                                <h4>{booking.get_property_price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})} x {booking.date_diff} days</h4>
                                
                                {/* <p>{booking.check_in}</p> */}
                                {/* <p><strong> £{property.price}</strong></p> */}
                                <br></br>
                                <h4>Guests: {booking.guests}</h4> 
                                <h4>Total = {booking.get_total.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</h4>

                                <button type="button"  style={{ margin: "1em"}}>Cancel Reservation</button>
                                <hr></hr>
                            </div>
                        ))} 
                        </section>
                    </Fragment>
                )}
            </div>
        )
    }
}
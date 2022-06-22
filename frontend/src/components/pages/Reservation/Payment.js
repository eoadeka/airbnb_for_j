import React, { Component, Fragment } from "react";
import {  Link } from "react-router-dom";
import axios from 'axios';
import { withUrlParams } from "../../../utils/urlParams";
import format from "date-fns/format";

class Payment extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            email: '',
            first_name: '',
            last_name: '',
            isAuth: false,
            loading: true,
            property: [],
            // price: parseFloat('').toFixed(2), 
            // nights: parseInt(''),
            booking: []
        }
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
                    loading: false
                })
            });
        }

        // const now = new Date();
        // const dateString = now.toLocaleDateString({
        // weekday: "short",
        // year: "numeric",
        // month: "2-digit",
        // day: "numeric"
        // })

        // console.log(dateString);


        this.showPropertyToPay();
    }

    async showPropertyToPay()  {
        // const  {user_id, property_id}  = this.props.params;
        const { id } = this.state;



        const [ firstResponse, secondResponse ] = await Promise.all([
            axios.get('/api/bookings/'+ this.state.user),
            axios.get('/api/properties/')
        ])
        this.setState(
            {booking: firstResponse.data,
            property: secondResponse.data}
        )
    }


    totalPrice = () => {
        const { booking, property } = this.state;
        return parseFloat( property.price * booking.date_diff ).toFixed(2);
    }

    

    
    render(){
        const { booking, email, first_name, last_name, loading,  user, property } = this.state;
        const options =  { year: "numeric", month: "long", day: "numeric" } // others: weekday: "short", year: "numeric", month: "long", day: "numeric"
      
        return(
            <div>
                { loading === false && (
                    <Fragment>
                        {booking.property}
                        <h1>Reservation</h1>
                        
                        <h2>Personal Info </h2>
                        <h4>Name</h4>
                        <p>{first_name} {last_name}</p>
                        <p>{email}</p>

                        <br></br>
                        <hr></hr>
                        <br></br>

                        <h2>Reservation Details</h2>
                        <p>You are about to pay for:</p>
                        {booking.filter((booking) => booking.user == user).map((booking,  index) => (
                            
                            <div key={index}>
                                <h2>{booking.get_property_title}</h2>
                                {/* <img src={booking.get_property_image} alt={booking.get_property_title} width="100%" height="500px"></img> */}

                                <h4>Check-in/out</h4>
                                <p><b>{new Date(booking.check_in).toLocaleDateString( 'en-GB', options)}</b> to <b>{new Date(booking.check_out).toLocaleDateString( 'en-GB', options)}</b></p>
                                {/* <p><b>{new Date(booking.check_in).toLocaleDateString( 'en-GB', { weekday: "short", year: "numeric", month: "long", day: "numeric" })}</b> to <b>{new Date(booking.check_out).toLocaleDateString( 'en-GB', { weekday: "short", year: "numeric", month: "long", day: "numeric" })}</b></p> */}
                                {/* <p><b>{booking.check_in }</b> to <b>{booking.check_out}</b></p> */}
                                

                                <br></br>
                                <h4>Guests: {booking.guests}</h4> 
                                <br></br>

                                <h4>{booking.get_property_price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})} x {booking.date_diff} days</h4>
                                <h4>Total = {booking.get_total.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</h4>

                                {/* <button type="button"  style={{ margin: "1em"}}>Cancel Reservation</button> */}
                            </div>
                        ))} 

                        <br></br>
                        <hr></hr>
                        <br></br>

                        <h2>Payment</h2>
                        <form>
                            <label>Payment Method</label><br></br>
                            <p>Credit/Debit Card    Paypal    </p>
                            {/* <input type="text"></input><br></br> */}

                            <label>Card number</label><br></br>
                            <input type="text"></input><br></br>

                            <label>Card holder</label><br></br>
                            <input type="text"></input><br></br>

                            <label>Expiry Date</label><br></br>
                            <input type="text" placeholder=""></input><br></br>

                            <label>CVV/CVC</label><br></br>
                            <input type="text" placeholder=""></input><br></br>

                            <br></br>
                            <br></br>
                            <button type="submit">Pay and <br></br> Confirm</button>
                            
                        </form>

                        <br></br>
                        <Link to={{ pathname: `/payment/confirmation` }}><button style={{marginBottom: "2em"}}>Payment Confirmation</button></Link><br></br>
                        <Link to={{ pathname: `/cancel-reservation` }}><button style={{marginBottom: "2em"}}>Cancel Reservation</button></Link>
                    </Fragment>
                )}
            </div>
        )
    }
}

export default withUrlParams(Payment)
import React, { Component, Fragment } from "react";
import {  Link, Navigate } from "react-router-dom";
import axios from "axios";
import { withUrlParams } from "../../../utils/urlParams";
// import {Box, TextField } from '@mui/material';
// import { DateRangePicker, DateRange } from "@mui/x-date-pickers";
// import { DateInput } from "semantic-ui-calendar-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";



// import { useParams } from "react-router-dom";
// import propertiesList from "./Properties";

 class Property extends Component {
    constructor(props){
        super(props);
        this.state = {
            property: [],
            propertyImagesList: [],
            isAuth: false,
            formShowing: true,
            checkIn: '',
            checkOut: '',
            guests: 2
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.showReservationForm = this.showReservationForm.bind(this);
    }

    componentDidMount(){
        this.showPropertyItem();
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true
            })
        }
    }

    totalPrice = (total) => {
        return total.price*total.nights
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const booking = {
            propertyItem: this.state.propertyItem,
            checkIn: this.state.checkIn,
            checkOut: this.state.checkOut,
            guests: this.state.guests
        };

        axios
            .post('/api/bookings/', booking, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => res.json())
            .then(data => {
                this.setState({ 
                    checkIn: data.checkIn,
                    checkOut: data.checkOut,
                    guests: data.guests
                })
            })
            .catch((err) => console.log(err))

        window.location.href = 'http://127.0.0.1:8000/payment';
    }

    async showPropertyItem(){
        // axios
        //     .get('/api/properties')
        //     .then((res) => this.setState({ propertiesList: res.data }))
        //     .catch((err) => console.log(err))
        const  {id}  = this.props.params;
        const [ firstResponse, secondResponse ] = await Promise.all([
            axios.get('/api/properties/'+ id),
            // axios.get('/api/properties/'),
            axios.get('/api/propertyImages/')
        ])
        this.setState(
            {property: firstResponse.data,
            propertyImagesList: secondResponse.data}
        )
        
        // console.log('asj')
        // console.log(this.state.property.type)
    }

    noOfDays(daysTotal){
        return (daysTotal.checkOut - daysTotal.checkIn) / (1000 * 3600 * 24);
    }

    showReservationForm = () => {
        this.setState(prevState => ({
            formShowing: !prevState.formShowing
        }));
    }
        
    render(){
        {/* USE SPREAD OPERATOR TO FILTER BY AMENITIES AVAILABLE */}

        const  {id}  = this.props.params;
        const {checkIn,checkOut, formShowing, guests, property, propertyImagesList, isAuth } = this.state;
        
        return(
            <div className="property_body">
                <div key={property.id}>
                    <h1>{property.title}</h1>
                    <img src={property.image} alt={property.title} width="100%" height="500px"></img>
                    <Link to={{ pathname: '/contact-us'}}><button type="button" style={{ position: "absolute", zIndex: "1", top: "-0.5em", right: "0"}}>Enquire Now</button></Link>
                    <span>{property.is_available === true ? <p>Available</p> : <p>Unavailable</p> }</span>

                    <p>{property.type}</p>
                    <p>{property.city}</p>
                    <h4>£{property.price} <span>per night</span></h4><br></br>
                    <p>{property.max_days} days</p>
                    <h4>Highlights</h4>
                    <p>{property.max_guests} guests{property.highlights?.map((highlights, index) => (
                        <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                    ))}</p>
                    <br></br>
                    
                    <hr></hr>
                    <br></br>
                    {
                        isAuth ?  (
                            <Fragment>
                                <button type="button" onClick={this.showReservationForm} style={{ margin: "1em"}}>Check Availability </button>
                                <button type="button"  style={{ margin: "1em"}}>Add To <br></br> Wishlist</button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Link to={{ pathname: `/login` }}><button style={{marginBottom: "2em"}}>Book Now</button></Link>
                                {/* <br></br> */}
                            </Fragment>
                        )
                    }
                    <br></br>
                    
                    <hr></hr>
                    <br></br>
                    { formShowing ? (
                            ''
                    ) : (
                        <Fragment>
                            <form className="booking_class" onSubmit={this.handleSubmit} method="POST">
                                <h4>Check-in</h4>
                                <DatePicker
                                    selected={checkIn}
                                    onChange={(date) => this.setState({checkIn: date})}
                                    selectsStart
                                    checkIn={checkIn}
                                    endDate={checkOut}
                                    minDate={new Date()}
                                    placeholderText="mm-dd-yyyy"
                                    type="date"
                                />
                                <h4>Check-out</h4>
                                <DatePicker
                                    selected={checkOut}
                                    // onChange={(date) => setcheckOut(date)}
                                    onChange={(date) => this.setState({checkOut: date})}
                                    selectsEnd
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                    minDate={checkIn}
                                    placeholderText="mm-dd-yyyy"
                                    type="date"
                                />

                                
                                <br></br>
                                <br></br>

                                <h4>Guests</h4>
                                <p>{guests}</p>

                                <br></br>
                                <br></br>


                                <button type="submit">Submit</button>

                                <br></br>
                                <br></br>
                            </form>
                            <hr></hr>
                        </Fragment>
                    )}

                    <div>{
                        this.noOfDays(this.state) === 0 ? (
                            ''
                        ) : (
                            <p>{this.noOfDays(this.state)}</p>
                        )
                    }</div>


                    
                    <h2>Description</h2>
                    <p>{property.description}</p>
                    
                    <br></br>
                    <hr></hr>
                    <h2>Amenities</h2>
                    

                    
                    <hr></hr>
                    
                    <br></br>
                    <h2>Property Images</h2>
                    <div>{property.property_images?.map((property_image, index) => (
                        <div key={index} className="property_images">
                            <img  src={property_image.images} alt={property.title} width="200" />
                        </div>
                    ))}</div>
                </div>
            </div>
        )
    }
}

export default withUrlParams(Property)

// Property Form
// Check-in Date
// Check-out Date
// apt type: 1Bed, 1 Bedroom, 2bed
// No of guests (add maximum)

// details
// Purpose of travel:leisure, business
// first name
// last name
// Country code
// Phone number
// email

// Please tick this box to confirm that you've read our Privacy Policy and Client Terms & Conditions
// Please tick this box if you'd like to receive updates from us. Don't worry it's not often


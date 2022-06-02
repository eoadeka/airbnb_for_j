import React, { Component, Fragment } from "react";
import {  Link } from "react-router-dom";
import axios from "axios";
import { withUrlParams } from "../../../utils/urlParams";

// import { useParams } from "react-router-dom";
// import propertiesList from "./Properties";

 class Property extends Component {
    constructor(props){
        super(props);
        this.state = {
            propertyItem: [],
            propertyImagesList: [],
            isAuth: false,
            formShowing: true,
        }
    }

    componentDidMount(){
        this.showPropertyItem();
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true
            })
        }
    }

    async showPropertyItem(){
        // axios
        //     .get('/api/properties')
        //     .then((res) => this.setState({ propertiesList: res.data }))
        //     .catch((err) => console.log(err))

        const [ firstResponse, secondResponse ] = await Promise.all([
            axios.get('/api/properties/'),
            axios.get('/api/propertyImages/')
        ])
        this.setState(
            {propertyItem: firstResponse.data,
            propertyImagesList: secondResponse.data}
        )
    }
        
    render(){
        {/* USE SPREAD OPERATOR TO FILTER BY AMENITIES AVAILABLE */}

        const   {id}  = this.props.params;
        const {propertyItem, propertyImagesList, isAuth } = this.state;
        
        return(
            <div className="property_body">
                <p>Property Page</p>

                {/* {id} */}
                {/* {slug} */}

                {propertyItem.filter((property) => property.id == id).map((property) => (
                    <div key={property.id}>
                        <h1>{property.title}</h1>
                        <img src={property.image} alt={property.title} width="100%" height="500px"></img>
                        <Link to={{ pathname: '/contact'}}><button type="button" style={{ position: "absolute", zIndex: "-1", top: "-0.5em", right: "0"}}>Enquire Now</button></Link>
                        <p>Type : {property.type}</p>
                        <p>City : {property.city}</p>
                        <p>Price: <strong> £{property.price}</strong> per night</p>
                        <p>Highlights : {property.highlights}</p>
                        <p>Description: {property.description}</p>
                        <p>Bathroom: {property.bathroom.map((bathroom, index) => (
                            <li key={index}>{bathroom}</li>
                        ))}</p>
                        <p>Bedroom: {property.bedroom.length == 0 ?  'Sorry, no amenities available' : property.bedroom}</p>
                        <p>Available: {property.is_available.toString()}</p>
                        <br></br>
                        <br></br>
                        {
                            isAuth ?  (
                                <Fragment>
                                    <button type="button">Check Availability</button>
                                    <br></br>
                                    <br></br>
                                    <button type="button" >Add to wishlist</button>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Link to={{ pathname: `/login` }}><button style={{marginBottom: "2em"}}>Book Now</button></Link>
                                    {/* <br></br> */}
                                </Fragment>
                            )
                        }
                        <hr></hr>
                        <br></br>
                        <h1>Property Images</h1>
                        <div>{property.property_images.map((property_image, index) => (
                            <div key={index}>
                                <img src={property_image.images} alt={property.title} width="200" />
                            </div>
                        ))}</div>

                        
                        {propertyImagesList.filter((propertyImage) => propertyImage.property === property.title).map((image) => (
                            <div key={image.id}>
                                {/* <p>{image.property}</p> */}
                                <img src={image.images} alt={image.property} width="200" />
                                {/* {propertyImage.images.map((image) => (
                                    <img src={image}  width="200" />   
                                ))}; */}
                            </div>
                        ))}
                        
                    </div>
                    
                ))}
                 {/* <p>Description: {property.description}</p>
                <p>Bathroom: {property.bathroom.map((bathroom, index) => (
                    <li key={index}>{bathroom}</li>
                ))}</p>
                <p>Bedroom: {property.bedroom.length == 0 ?  'Sorry, no amenities available' : property.bedroom}</p>
                <p>Availability: {property.is_available.toString()}</p>
                <p>Property Images:
                    {property.property_images}
                </p> */}
                <br></br>
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


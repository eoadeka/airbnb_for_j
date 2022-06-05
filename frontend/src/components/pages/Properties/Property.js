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

                {/* {id} */}
                {/* {slug} */}

                {propertyItem.filter((property) => property.id == id).map((property) => (
                    <div key={property.id}>
                        <h1>{property.title}</h1>
                        <img src={property.image} alt={property.title} width="100%" height="500px"></img>
                        <Link to={{ pathname: '/contact-us'}}><button type="button" style={{ position: "absolute", zIndex: "1", top: "-0.5em", right: "0"}}>Enquire Now</button></Link>
                        <span>{property.is_available === true ? <p>Available</p> : <p>Unavailable</p> }</span>

                        <p>{property.type}</p>
                        <p>{property.city}</p>
                        <h4>£{property.price} <span>per night</span></h4><br></br>
                        <h4>Highlights</h4>
                        <p>{property.highlights.map((highlights, index) => (
                            <span key={index} style={{ padding: "0.5em"}}>{highlights}</span>
                        ))}</p>
                        <br></br>
                        
                        <hr></hr>
                        <br></br>
                        {
                            isAuth ?  (
                                <Fragment>
                                    <button type="button"  style={{ margin: "1em"}}>Check Availability </button>
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
                        <h2>Description</h2>
                        <p>{property.description}</p>
                        
                        <br></br>
                        <hr></hr>
                        <h2>Amenities</h2>
                        <Fragment>
                            {/* ATTRACTIONS */}
                            { property.attractions.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Atrractions</h4>  {property.attractions.map((attractions, index) => (
                                    <li key={index}>{attractions}</li>
                                ))}</div>
                            )}

                            {/* BATHROOM */}
                            { property.bathroom.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Bathroom</h4>  {property.bathroom.map((bathroom, index) => (
                                    <li key={index}>{bathroom}</li>
                                ))}</div>
                            )}

                            {/* BEDROOM */}
                            { property.bedroom.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Bedroom</h4>  {property.bedroom.map((bedroom, index) => (
                                    <li key={index}>{bedroom}</li>
                                ))}</div>
                            )}

                            {/* CLEANING */}
                            { property.cleaning.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Cleaning</h4>  {property.cleaning.map((cleaning, index) => (
                                    <li key={index}>{cleaning}</li>
                                ))}</div>
                            )}

                            {/* ENTERTAINMENT */}
                            { property.entertainment.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Entertainment</h4>  {property.entertainment.map((entertainment, index) => (
                                    <li key={index}>{entertainment}</li>
                                ))}</div>
                            )}

                            {/* FAMILY */}
                            { property.family.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Family</h4>  {property.family.map((family, index) => (
                                    <li key={index}>{family}</li>
                                ))}</div>
                            )}

                            {/* FACILITIES */}
                            { property.facilities.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Facilities</h4>  {property.facilities.map((facilities, index) => (
                                    <li key={index}>{facilities}</li>
                                ))}</div>
                            )}

                            {/* HEATING AND COOLING */}
                            { property.heating_and_cooling.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Heating and Cooling</h4>  {property.heating_and_cooling.map((heating_and_cooling, index) => (
                                    <li key={index}>{heating_and_cooling}</li>
                                ))}</div>
                            )}
                            
                            {/* INTERNET AND OFFICE */}
                            { property.internet_and_office.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Internet And Office</h4>  {property.internet_and_office.map((internet_and_office, index) => (
                                    <li key={index}>{internet_and_office}</li>
                                ))}</div>
                            )}
                        
                            {/* KITCHEN AND DINING */}
                            { property.kitchen_and_dining.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Kitchen and Dining</h4>  {property.kitchen_and_dining.map((kitchen_and_dining, index) => (
                                    <li key={index}>{kitchen_and_dining}</li>
                                ))}</div>
                            )}

                            {/* Outdoors */}
                            { property.outdoors.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Outdoors</h4>  {property.outdoors.map((outdoors, index) => (
                                    <li key={index}>{outdoors}</li>
                                ))}</div>
                            )}

                            {/* PARKING */}
                            { property.parking.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Parking</h4>  {property.parking.map((parking, index) => (
                                    <li key={index}>{parking}</li>
                                ))}</div>
                            )}

                            {/* SAFETY */}
                            { property.safety.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Safety</h4>  {property.safety.map((safety, index) => (
                                    <li key={index}>{safety}</li>
                                ))}</div>
                            )}

                            {/* SERVICES */}
                            { property.services.length == 0 ? (
                                ''
                            ) : (
                                <div><h4>Services</h4>  {property.services.map((services, index) => (
                                    <li key={index}>{services}</li>
                                ))}</div>
                            )}
                        </Fragment>


                       
                        <hr></hr>
                        <br></br>
                        <h2>Property Images</h2>
                        <div>{property.property_images.map((property_image, index) => (
                            <div key={index} className="property_images">
                                <img  src={property_image.images} alt={property.title} width="200" />
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


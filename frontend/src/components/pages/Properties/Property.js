import React, { Component } from "react";
import { withUrlParams } from "../../../utils/urlParams";
import axios from "axios";
// import { useParams } from "react-router-dom";
// import propertiesList from "./Properties";

 class Property extends Component {
    constructor(props){
        super(props);
        this.state = {
            propertyItem: [],
            propertyImagesList: []
        }
    }

    componentDidMount(){
        this.showPropertyItem();
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
        const {propertyItem, propertyImagesList } = this.state;
        
        return(
            <div className="property_body">
                <p>Property Page</p>

                {/* {id} */}
                {/* {slug} */}

                {propertyItem.filter((property) => property.id == id).map((property) => (
                    <div key={property.id}>
                        <h1>{property.title}</h1>
                        <img src={property.image} alt={property.title} width="100%" height="500px"></img>
                        <p>Type : {property.type}</p>
                        <p>City : {property.city}</p>
                        <p>Highlights : {property.highlights}</p>
                        <p>Description: {property.description}</p>
                        <p>Bathroom: {property.bathroom.map((bathroom, index) => (
                            <li key={index}>{bathroom}</li>
                        ))}</p>
                        <p>Bedroom: {property.bedroom.length == 0 ?  'Sorry, no amenities available' : property.bedroom}</p>
                        <p>Available: {property.is_available.toString()}</p>
                        <br></br>
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
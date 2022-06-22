import React, { Component } from "react";
import axios from 'axios';
import { withUrlParams } from "../../../utils/urlParams";
import { Link } from "react-router-dom";


class City extends Component{
    constructor(props){
        super(props);
        this.state = {
            cities: [],
            properties: []
        }
    }

    componentDidMount(){
        this.showCity();
    }

    async showCity (){
         const [ firstResponse, secondResponse ] = await Promise.all([
            axios.get('/api/cities/'),
            axios.get('/api/properties/')
        ])
        this.setState(
            {cities: firstResponse.data,
            properties: secondResponse.data}
        )
    }
    
    render(){

        const   {slug}  = this.props.params;
        const {cities, properties } = this.state;

        return(
            <div className="city_body">
                {cities.filter((city) => city.slug == slug).map((city) => (
                    <div key={city.id}>
                        <h1>{city.city}</h1>
                        {properties.filter((property) => city.city == property.city).map(property => (
                            <div key={property.id}>
                                <Link to={{ pathname: `/properties/${property.slug}/${property.id}`}}>
                                    <h2>{property.title}</h2>
                                    <img src={property.image} alt={property.title} width="200"></img>
                                    <p><strong> {property.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strong></p>
                                    <br></br>
                                </Link>
                                <hr></hr>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}

export default withUrlParams(City)
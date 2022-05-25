import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Cities extends Component{
    constructor(props){
        super(props);
        this.state = {
            citiesList: [],
        }
    }

    componentDidMount(){
        this.showCities();
    }

    async showCities(){
        axios
            .get("/api/cities/")
            .then((res) => this.setState({ citiesList: res.data }))
            .catch((err) => console.log(err));   
    }
    
    render(){
        return(
            <div className="cities_body">
                <h1>Cities</h1>
                {this.state.citiesList.map((cities, index) =>(
                    <div key={index}>
                        <Link to={{ pathname: `/cities/${cities.slug}` }}>
                            { cities.city }
                        </Link>
                    </div>
                    
                ))}
            </div>
        )
    }
}
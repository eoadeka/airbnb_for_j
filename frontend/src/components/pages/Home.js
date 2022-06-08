import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                <h1>Home</h1>
                <p>AIRBNB</p>
                <Link to={{ pathname: '/amenities'}}>Amenities</Link>
            </div>
        )
    }
}
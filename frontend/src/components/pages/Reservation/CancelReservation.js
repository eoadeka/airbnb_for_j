import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CancelReservation extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                <h1>Cancel Reservation</h1>
                <p>Are you sure you want to?</p>
            </div>
        )
    }
}
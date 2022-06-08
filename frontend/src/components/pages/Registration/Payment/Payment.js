import React, { Component } from "react";

export default class Payment extends Component{
    constructor(props){
        super(props);
    }

    
    render(){
        return(
            <div>
                <h1>Payment</h1>
                <p>You are about to pay</p>
            </div>
        )
    }
}
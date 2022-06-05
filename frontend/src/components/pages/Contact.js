import React, { Component } from "react";

export default class Contact extends Component{
    constructor(props){
        super(props);
    }

    
    render(){
        return(
            <div>
                <h1>Contact Us</h1>
                <p>email us at: <a href="mailto:abc123@gmail.com?subject=Enquiry">abc123@gmail.com</a></p>
                <p>OR call us at: <a href="tel:+2349012345678">+234-901-234-5678</a></p>
            </div>
        )
    }
}
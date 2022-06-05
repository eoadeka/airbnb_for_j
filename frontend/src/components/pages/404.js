import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ErrorPage extends Component{
    constructor(props){
        super(props);
    }

    
    render(){
        return(
            <div>
                <h1>Oops!</h1>
                <h4>Page Not found!</h4>
                <Link to={{ pathname: '/' }}></Link>
            </div>
        )
    }
}
import React, { Component } from "react";
import MainNavigation from "./MainNavigation";

export default class Layout extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div>
                <MainNavigation />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
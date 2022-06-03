import React, { Component } from "react";

export default class Admin extends Component{
    constructor(props){
        super(props);
    }

    
    render(){
        return(
            <div>
                <h2>Admin</h2>
                <h4>Users</h4>
                <p>email: abc123@gmail.com</p>

                <br></br>
                <br></br>
                
                <h4>Bookings</h4>
                <p>Property:<strong> The Daily Planet</strong></p>
                <p>email: abc123@gmail.com</p>


            </div>
        )
    }
}
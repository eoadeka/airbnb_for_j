import React, { Component } from "react";

export default class ResendEmailVerify extends Component{
    constructor(props){
        super(props);
    }

    // url: api/v1/users/dj-rest-auth/registration/resend-email/
    
    render(){
        return(
            <div>
                <h1>Resend Email Verification</h1>
                <form>
                    <input type="email" name="email" placeholder="Email"></input>
                    <br></br>
                    <br></br>
                    <button type="submit">Resend</button>
                </form>
            </div>
        )
    }
}
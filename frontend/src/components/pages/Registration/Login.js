import React, { Component } from "react";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
            // value: ''
        }
    }

    
    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" value={this.state.value} onChange={this.handleChange} name="email" placeholder="Email"></input>
                    <input type="password" value={this.state.value} onChange={this.handleChange} name="password" placeholder="Password"></input>

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
    }
}
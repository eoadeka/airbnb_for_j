import React, { Component } from "react";

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            avatar: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            email: event.target.value,
            firstName: event.target.value,
            lastName: event.target.value,
            avatar: event.target.value,
            password: event.target.value,
            confirmPassword: event.target.value,
         })
    }

    handleSubmit = () => {
        console.log(this.state)
    }
    
    render(){
        return(
            <div>
                <h1>Register</h1>
                <p>Register here</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label><br></br>
                    <input type="email" value={this.state.email} onChange={this.handleChange} name="email"></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="firstname">First Name</label><br></br>
                    <input type="text" value={this.state.firstName} onChange={this.handleChange} name="firstname"></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="lastname">Last Name</label><br></br>
                    <input type="text" value={this.state.lastName} onChange={this.handleChange} name="lastname"></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="password">Password</label><br></br>
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="passsword"></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="confirmPassword">Confirm Password</label><br></br>
                    <input type="password" value={this.state.confirmPassword} onChange={this.handleChange} name="confirmPasssword"></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="avatar">Profile Picture</label><br></br>
                    <input type="file" value={this.state.value} onChange={this.handleChange} name="avatar"></input>
                    <br></br>
                    <br></br>

                    {/* <input type="email" placeholder="Email"></input>
                    <input type="file"></input> */}
                    <input type="submit" value="Submit" onSubmit={this.handleSubmit}></input>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </form>
            </div>
        )
    }
}
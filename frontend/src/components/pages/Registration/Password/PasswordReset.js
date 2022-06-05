import React, { Component, Fragment } from "react";

export default class PasswordReset extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            isAuth: false,
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isAuth: true
            })
            window.location.replace('http://127.0.0.1:8000/');
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = () => {

    }

    // url: api/v1/users/ dj-rest-auth/ password/reset/ 
    
   

    
    render(){
        const { email, isAuth } = this.state;

        return(
            <div>
                { isAuth === false && (
                    <Fragment>
                        <h2>Reset Password</h2>
                        <p>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
                        <br></br>
                        <form onSubmit={this.handleSubmit}>
                            <input type="email" value={email} onChange={this.handleChange} name="email" placeholder="Email"></input>
                            <br></br>
                            <br></br>
                            <button type="submit">Reset My Password</button>
                        </form>
        
                        <br></br>
                        <p>Please <a href="mailto:abc123@gmail.com?subject=Password Reset">contact us</a> if you have any trouble resetting your password.</p>
                    </Fragment>
                )}
            </div>
        )
    }
}
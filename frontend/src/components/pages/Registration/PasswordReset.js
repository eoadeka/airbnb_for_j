import React, { Component, Fragment } from "react";

export default class PasswordReset extends Component{
    constructor(props){
        super(props);
        this.state = {
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

    
    render(){
        const { isAuth } = this.state;
        
        return(
            <div>
                { isAuth === false && (
                    <Fragment>
                        <h2>Password Reset</h2>
                        <p>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
                        <br></br>
                        <form>
                            <input type="email" name="email" placeholder="Email"></input>
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
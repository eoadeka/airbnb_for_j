import React, { Component, Fragment } from "react";

export default class PasswordResetConfirm extends Component{
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


    // url: api/v1/users/ dj-rest-auth/ password/reset/confirm/
    
    render(){
        const { isAuth } = this.state;

        return(
            <div>
                { isAuth === false && (
                    <Fragment>
                        <h2>Confirm Your New Password</h2>
                        <br></br>
                        <form>
                            <input type="text" name="uid" placeholder="uid"></input>
                            <br></br>
                            <input type="text" name="token" placeholder="Token"></input>
                            <br></br>
                            <input type="password" name="new_password1" placeholder="New Password"></input>
                            <br></br>
                            <input type="password" name="new_password2" placeholder="Confirm New Password"></input>
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
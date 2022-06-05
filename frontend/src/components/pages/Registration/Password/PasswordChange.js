import React, { Component, Fragment } from "react";

export default class PasswordChange extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            isAuth: true,
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            this.setState({
                isAuth: false
            })
            window.location.replace('http://127.0.0.1:8000/login');
        }
    }


    // url: api/v1/users/ dj-rest-auth/ password/change/ 
    
    render(){
        const { isAuth } = this.state;

        return(
            <div>
                { isAuth === true && (
                    <Fragment>
                        <h2>Change Your Password</h2>
                        <br></br>
                        <form>
                            <input type="password" name="old_password" placeholder="Old Password"></input>
                            <br></br>
                            <input type="password" name="new_password1" placeholder="New Password"></input>
                            <br></br>
                            <input type="password" name="new_password2" placeholder="Confirm New Password"></input>
                            <br></br>
                            <br></br>
                            <button type="submit">Change Password</button>
                        </form>
        
                        <br></br>
                        <p>Please <a href="mailto:abc123@gmail.com?subject=Password Change">contact us</a> if you have any trouble changing your password.</p>
                    </Fragment>
                )}
            </div>
        )
    }
}
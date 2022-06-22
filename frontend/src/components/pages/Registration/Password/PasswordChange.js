import React, { Component, Fragment } from "react";

export default class PasswordChange extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            isAuth: true,
            errors: false,
            password: '',
            old_password: '',
            new_password1: '',
            new_password2: '',
        }
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            this.setState({
                isAuth: false,
                
            })
            window.location.replace('http://127.0.0.1:8000/login');
        } else {
            fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    password: data.password,
                    loading: false
                })
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]  : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.password == this.state.old_password && this.state.old_password !== this.state.new_password1 && this.state.old_password != this.state.new_password2) {
            return;
        }

        const passwords = {
            old_password: this.state.old_password,
            new_password1: this.state.new_password1,
            new_password2: this.state.new_password2
        };

        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/password/change/', {
        // fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(passwords)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (this.state.password !== this.state.old_password && this.state.old_password !== this.state.new_password1 || this.state.old_password !== this.state.new_password2) {
                    localStorage.clear();
                    window.location.replace('http://127.0.0.1:8000/login');
                } else {
                    this.setState({
                        old_password: '',
                        new_password1: '',
                        new_password2: '',
                        errors: true
                    })
                }
            })
            .catch((err) => console.log(err))
        }
        
        
        // url: api/v1/users/ dj-rest-auth/ password/change/ 
        
        render(){
        // console.log(this.state.password)
        const { old_password, new_password1, new_password2, errors, isAuth } = this.state;

        return(
            <div>
                { isAuth === true && (
                    <Fragment>
                        <h2>Change Your Password</h2>
                        { errors === true && <h2>Invalid password</h2> }
                        <br></br>
                        <form onSubmit={this.handleSubmit}>
                            <input type="password" value={old_password} onChange={this.handleChange} name="old_password" placeholder="Old Password"></input>
                            <br></br>
                            <input type="password" value={new_password1} onChange={this.handleChange} name="new_password1" placeholder="New Password"></input>
                            <br></br>
                            <input type="password" value={new_password2} onChange={this.handleChange} name="new_password2" placeholder="Confirm New Password"></input>
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
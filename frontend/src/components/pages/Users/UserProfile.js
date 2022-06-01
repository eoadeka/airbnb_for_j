import React, { Component, Fragment } from "react";

export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            email: '',
            first_name: '',
            last_name: '',
            avatar: '',
            loading: true
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } else {
            fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/user/', {
            // fetch('http://127.0.0.1:8000/api/users/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar,
                    loading: false
                })
            });
        }
    }

    formatUser(user){
        return user.first_name + ' ' + user.last_name;
    }

    
    render(){
        const { avatar, email, first_name, loading } = this.state;
        
        return(
            <div>
                { loading === false && (
                    <Fragment>
                        <h1>User Profile</h1>
                        <h6>Hello, {first_name}</h6>
                        <p>Fullname: {this.formatUser(this.state)}</p>
                        <p>Email: {email}</p>
                        <img src={avatar} alt={first_name} width="200"></img>
                    </Fragment>
                )}
            </div>
        )
    }
}
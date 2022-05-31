import React, { Component, Fragment } from "react";

export default class Logout extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount(){
        if (localStorage.getItem('token') == null) {
            window.location.replace('http://127.0.0.1:8000/login');
        } else{
            this.setState({
                loading: false
            })
        } 
        
    }

    handleLogout = (event) => {
        event.preventDefault();
        // url to use: http://127.0.0.1:8000/api/v1/users/dj-rest-auth/logout/

        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.clear();
                window.location.replace('http://127.0.0.1:8000/login');
            });
    }
    
    render(){
        const { loading } = this.state;
        
        return(
            <div>
                { loading === false && (
                    <Fragment>
                        <h2>Logout</h2>
                        <p>Are you sure you want to logout?</p>
                        <input type="button" value="Logout" onClick={this.handleLogout} />
                    </Fragment>
                )}
            </div>
        )
    }
}
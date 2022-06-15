import React, { Component, Fragment } from "react";

export default class DeactivateUserAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            avatar: '',
            loading: true,
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

    
    render(){
        const { first_name, loading } = this.state;

        return(
            <div>
               { loading === false && (
                    <Fragment>
                        {''}
                        {/* <h6>Sad to see you go,{first_name} :(</h6> */}
                        <h6>Sad to see you go :(</h6>
                        <h3>{first_name}, tell us your reasons</h3>
                        <p>Don't really like it here :(</p>
                        <br></br>
                        <button>Deactivate</button>
                    </Fragment>
               )}
            </div>
        )
    }
}
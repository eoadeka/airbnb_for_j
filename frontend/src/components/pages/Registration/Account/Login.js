import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: false,
            loading: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.setState({
            loading: false
        })
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // url to use: http://127.0.0.1:8000/api/v1/users/dj-rest-auth/login/
        
        // facebook url: http://127.0.0.1:8000/accounts/facebook/login/?process=login
        // google url: http://127.0.0.1:8000/dj-rest-auth/google/?process=login
        // twitter url: http://127.0.0.1:8000/dj-rest-auth/twitter/?process=login
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        // fetch('http://127.0.0.1:8000/tight/login/', {
        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/login/', {
        // fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                // this.setState({ propertiesList: res.data })
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://127.0.0.1:8000/user/profile');
                } else {
                    this.setState({
                        email:'',
                        password:'',
                        errors: true
                    })
                    localStorage.clear();
                }
            });
    }
    
    render(){
        const { email, password, loading, errors } = this.state;
        return(
            <div>
                { loading === false && <h1>Login</h1> }
                { errors === true && <h2>Invalid email or password</h2> }

                {/* <h1>Login</h1>  */}
                { loading === false && (
                    <Fragment>
                        <form onSubmit={this.handleSubmit}>
                            <input type="email" value={email} onChange={this.handleChange} name="email" placeholder="Email"></input>
                            <br></br>
                            <input type="password" value={password} onChange={this.handleChange} name="password" placeholder="Password"></input>
                            <br></br>
                            <br></br>
                                {/* <a href="http://127.0.0.1:8000/tight/password/reset/">Forgot Password?</a>
                                <br></br>
                                <a href="http://127.0.0.1:8000/api/v1/users/dj-rest-auth/password/change/">Forgot Password?</a> */}
                                <Link to={{ pathname: '/user/password-reset' }} style={{ marginRight: "2em"}}>Forgot Password?</Link>
                            <button type="submit">Login</button>
                        </form>
                        
                        <br></br>
                        <h3>Not Registered?</h3>
                        <Link to={{ pathname: '/signup' }} style={{ marginRight: "2em"}}>Create an Account</Link>

                        <br></br>
                        <br></br>

                        <h3>Or signin with</h3>  
                        {/* <a href="http://127.0.0.1:8000/tight/facebook/login/?process=login">Facebook</a> */}
                        <a href="http://127.0.0.1:8000/dj-rest-auth/facebook/?process=login">Facebook</a>
                        <br></br>
                        <a href="http://127.0.0.1:8000/dj-rest-auth/google/?process=login">Google</a>
                        <br></br>
                        <a href="http://127.0.0.1:8000/dj-rest-auth/twitter/?process=login">Twitter</a>
                    </Fragment>                  
                )}
            </div>
        )
    }
}

// axios
//             .post('http://127.0.0.1:8000/api/auth/login/', {
//                 headers: {
//                     Accept: "application/json",
//                     // "Content-Type": "application/json;charset=UTF-8",
//                 },
//                 body: JSON.stringify(user)
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.key) {
//                     localStorage.clear();
//                     localStorage.setItem('token'. data.key);
//                     window.location.replace('http://127.0.0.1:8000/profile');
//                 } else {
//                     this.setState({
//                         email: '',
//                         password: '',
//                         errors: true
//                     });
//                     localStorage.clear();

//                 }
//             })
//             .catch((err) => console.log(err))
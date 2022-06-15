import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            // avatar: null,
            password1: '',
            password2: '',
            errors: false,
            loading: true,
            // isLoggedIn: false,
            // isRegistered: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://127.0.0.1:8000/profile');
        } else {
            this.setState({
                loading: false
            })
        }
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value,
        });
    }
    // handleImageChange = (event) =>{
    //     this.setState({
    //         avatar: event.target.files[0]
    //     })
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.avatar);
        const formData = new FormData();
        // formData.append('avatar', this.state.avatar, this.state.avatar.name);
        formData.append('email',  this.state.email);
        formData.append('first_name',  this.state.first_name);
        formData.append('last_name',  this.state.last_name);
        formData.append('password1',  this.state.password1);
        formData.append('password2',  this.state.password2);
       
        
        // url to use: http://127.0.0.1:8000/api/v1/users/dj-rest-auth/registration/
        // fetch('http://127.0.0.1:8000/api/auth/register/', {
        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/registration/', {
            method: 'POST',
            body:formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://127.0.0.1:8000/user/profile');
                } else {
                    this.setState({
                        email:'',
                        first_name:'',
                        last_name:'',
                        // avatar: null,
                        password1:'',
                        password2:'',
                        errors: true
                    })
                    localStorage.clear();
                }
                console.log(data)
            })
            .catch((err) => console.log(err))
    }
    
    render(){
        const { email, first_name, last_name, avatar, password1, password2, loading, errors } = this.state;

        return(
            <div>
                {loading === false && <h1>Signup</h1>}
                {errors === true && <h2>Cannot signup with provided credentials</h2>}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label><br></br>
                    <input type="email" value={email} onChange={this.handleChange} name="email" required></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="first_name">First Name</label><br></br>
                    <input type="text" value={first_name} onChange={this.handleChange} name="first_name" required></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="last_name">Last Name</label><br></br>
                    <input type="text" value={last_name} onChange={this.handleChange} name="last_name" required></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="password1">Password</label><br></br>
                    <input type="password" value={password1} onChange={this.handleChange} name="password1"></input>
                    <br></br>
                    <br></br>

                    <label htmlFor="password2">Confirm Password</label><br></br>
                    <input type="password" value={password2} onChange={this.handleChange} name="password2"></input>
                    <br></br>
                    <br></br>

                    {/* <label htmlFor="avatar">Profile Picture</label><br></br>
                    <input type="file"   id="avatar"  onChange={this.handleImageChange} name="avatar"></input> */}
                   
                    <br></br>
                    <br></br>

                    {/* <input type="submit" value="Submit" ></input> */}
                    <button type="submit">Submit</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </form>

                <br></br>
                <h3>Already Have An Account?</h3>
                <Link to={{ pathname: '/login' }} style={{ marginRight: "2em"}}>Log in to your account</Link>

                {this.isLoggedIn}
            </div>
        )
    }
}
import React, { Component } from "react";

export default class Signup extends Component{
    constructor(props){
        super(props);
        // this.myRef = React.createRef(null);
        this.state = {
            avatar: null,
            email: '',
            first_name: '',
            last_name: '',
            // avatar: 'http://127.0.0.1:8000/images/images/profile_pic/',
            password1: '',
            password2: '',
            errors: false,
            loading: true,
            isLoggedIn: false,
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
            [event.target.name]: event.type === "file" ? event.target.files[0] : event.target.value,
            // email: event.target.value,
            // first_name: event.target.value,
            // last_name: event.target.value,
            // avatar:  avatar,
            // password1: event.target.value,
            // password2: event.target.value,
        });


    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file',  this.state.avatar);
        const user = {
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            // avatar: this.state.avatar,
            password1: this.state.password1,
            password2: this.state.password2
        };
        console.log(this.state.avatar);
        // const bodyFormData = new FormData();
        // bodyFormData.append('file', this.myRef.files[0]);
        
        // formData.append('fileName', file.name);
        formData.append('user', JSON.stringify(user));
        // url to use: http://127.0.0.1:8000/api/v1/users/dj-rest-auth/registration/
        
        // h.Accept = 'application/json'
        // fetch('http://127.0.0.1:8000/api/auth/register/', {
        fetch('http://127.0.0.1:8000/api/v1/users/dj-rest-auth/registration/', {
            method: 'POST',
            headers: {
                // Accept: 'application/json'
                // 'Content-Type': 'application/json'
                'Content-Type': 'multipart/form-data'
            },
            body:formData
            })
            .then(res => res.json())
            // .then(res => {console.log(res)})
            .then(data => {
                if (data.key) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://127.0.0.1:8000/profile');
                } else {
                    this.setState({
                        email:'',
                        first_name:'',
                        last_name:'',
                        avatar: null,
                        password1:'',
                        password2:'',
                        errors: true
                    })
                    localStorage.clear();
                }
                console.log(user)
                console.log(user.avatar)
                console.log(user.avatar.name)
                // console.log(formData)
            })
            .catch((err) => console.log(err))
        // this.setState({
        //     isLoggedIn: true,
        // },
        //     () => console.log(this.state.isLoggedIn)
        // );
        // console.log("submitted");
    }
    
    render(){
        const { email, first_name, last_name, avatar, password1, password2, loading, errors } = this.state;

        return(
            <div>
                {loading === false && <h1>Signup</h1>}
                {errors === true && <h2>Cannot signup with provided credentials</h2>}
                <form onSubmit={this.handleSubmit} method="POST" >
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

                    <label htmlFor="avatar">Profile Picture</label><br></br>
                    <input type="file"  onChange={this.handleChange} name="avatar"></input>
                    {/* <input type="file"  value={avatar} onChange={this.handleChange} name="avatar"></input> */}
                    <br></br>
                    <br></br>

                    {/* <input type="email" placeholder="Email"></input>
                    <input type="file"></input> */}
                    <input type="submit" value="Submit" ></input>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </form>
                {this.isLoggedIn}
            </div>
        )
    }
}
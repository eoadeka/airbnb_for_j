import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true,
            email: '',
            first_name: '',
            last_name: '',
            avatar: '',
            loading: true,
            formShowing: true,

            newFirstName : '',
            newLastName : '',
        }
        // console.log(this.state.formShowing)

        this.showUpdateForm = this.showUpdateForm.bind(this);
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

        // window.sessionStorage.setItem("formShowing", this.state.formShowing);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    formatUser(user){
        return user.first_name + ' ' + user.last_name;
    }

    showUpdateForm = () => {
        this.setState(prevState => ({
            formShowing: !prevState.formShowing
        }));
    }

    
    render(){
        const { avatar, email, first_name, last_name, loading, formShowing } = this.state;
        const { newFirstName, newLastName } = this.state;
        
        return(
            <div>
                { loading === false && (
                    <Fragment>
                        <main>
                            <Link to={{ pathname: `/user/deactivate` }} style={{ position: "absolute", top: "1em", right: "1em"}}>Deactivate</Link>
                            {/* <h1>User Profile</h1> */}
                            <h1>Hello, {first_name}</h1>
                            <button type="button" onClick={this.showUpdateForm} style={{ position: 'absolute', right: "0"}}>{ formShowing ? 'Edit' : 'Close'}</button>
                            <p>Fullname: {this.formatUser(this.state)}</p>
                            <p>Email: {email}</p>
                            <img src={avatar} alt={first_name} className="profile_pic"></img>
                        </main>   

                        <section style={{ position: 'absolute', right: "0", textAlign: "right"}}>
                            { formShowing ? (
                                ''
                            ) : (
                                <form>
                                    <h4 style={{fontFamily: "'Syne', sans-serif", fontSize: "2em"}}>Update  Form</h4>
                                    <input type="text"  value={newFirstName} name="newFirstName" onChange={this.handleChange} placeholder="First Name" style={{backgroundColor: "white"}} />
                                    <br></br>
                                    <input type="text"  value={newLastName} name="newLastName" onChange={this.handleChange} placeholder="Last Name" style={{backgroundColor: "white"}} />
                                    <br></br>
                                    <input type="submit" value="Update"></input>
                                </form> 
                            )}
                        </section>
                    </Fragment>
                )}
            </div>
        )
    }
}
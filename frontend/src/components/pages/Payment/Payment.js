import React, { Component, Fragment } from "react";

export default class Payment extends Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            isAuth: false,
            loading: true,
            property: '',
            price: parseFloat('').toFixed(2), 
            guests: '',
            nights: parseInt(''),
            checkInDate: '',
            chekOutDate: '',
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
                    first_name: data.first_name,
                    loading: false
                })
            });
        }
    }

    totalPrice = (total) => {
        return total.price*total.nights
    }

    
    render(){
        const { checkInDate, chekOutDate, first_name, guests,loading, nights, price, property } = this.state;
        return(
            <div>
                { loading === false && (
                    <Fragment>
                        <h1>Payment</h1>
                        <h2>{first_name}</h2>
                        <p>You are about to pay for:</p>
                        <h2>The Daily Planet</h2>
                        <h2>{property}</h2>
                        <p>from {checkInDate} to {chekOutDate}</p>
                        <h4>{price} x {nights}</h4>
                        <h4>Total = {this.totalPrice(this.state)}</h4>
                        <h4>Guests: {guests}</h4>
                    </Fragment>
                )}
            </div>
        )
    }
}
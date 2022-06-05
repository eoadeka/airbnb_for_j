import React, { Component, Fragment } from "react";
import axios from "axios";
import { withUrlParams } from "../../utils/urlParams";

class Amenities extends Component {
    constructor(props){
        super(props);
        this.state = {
            amenities: [],
        }
    }

    componentDidMount(){
        this.showAmenities();
    }

     showAmenities(){
        axios
            .get('http://127.0.0.1:8000/amenities/amenities')
            .then((res) => this.setState({ amenities: res.data }))
            .catch((err) => console.log(err))
    }
        
    render(){
        const { amenities } = this.state;

        return(
            <div>
                <h1>Amenities</h1>

                    <Fragment>
                    { amenities.attractions?.length == 0 ? (
                            <div>
                                <h3>Atrractions</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Atrractions</h3>  {amenities.attractions?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.bathroom?.length == 0 ? (
                            <div>
                                <h3>Bathroom</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Bathroom</h3>  {amenities.bathroom?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.bedroom?.length == 0 ? (
                            <div>
                                <h3>Bedroom</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Bedroom</h3>  {amenities.bedroom?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.cleaning?.length == 0 ? (
                            <div>
                                <h3>Cleaning</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>cleaning</h3>  {amenities.cleaning?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.entertainment?.length == 0 ? (
                            <div>
                                <h3>Entertainment</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Entertainment</h3>  {amenities.entertainment?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.family?.length == 0 ? (
                            <div>
                                <h3>Family</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Family</h3>  {amenities.family?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.facilities?.length == 0 ? (
                            <div>
                                <h3>Facilities</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Facilities</h3>  {amenities.facilities?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.internet_and_office?.length == 0 ? (
                            <div>
                                <h3>Internet and Office</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Internet and Office</h3>  {amenities.internet_and_office?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.kitchen_and_dining?.length == 0 ? (
                            <div>
                                <h3>Kitchen and Dining</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Kitchen and Dining</h3>  {amenities.kitchen_and_dining?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.outdoors?.length == 0 ? (
                            <div>
                                <h3>Outdoors</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Outdoors</h3>  {amenities.outdoors?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.parking?.length == 0 ? (
                            <div>
                                <h3>Parking</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Parking</h3>  {amenities.parking?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.safety?.length == 0 ? (
                            <div>
                                <h3>Safety</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Safety</h3>  {amenities.safety?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.services?.length == 0 ? (
                            <div>
                                <h3>Services</h3> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div><h3>Services</h3>  {amenities.services?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                        
                <br></br>
            </div>
        )
    }
}

export default withUrlParams(Amenities);




                // {/* {amenities.attractions?.[0].amenity} */}

                //      {/* {amenities.amenity.length == 0 ? (
                //             ''
                //         ) : ( */}
                //         <div><h4>Atrractions</h4>  {amenities.bathroom?.map((amenity, index) => (
                //             <li key={index}>{amenity.amenity}</li>
                //         ))}</div>
                //     {/* )} */}

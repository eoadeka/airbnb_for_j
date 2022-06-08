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
                            <div className="amenities">
                                <h2>Atrractions</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Atrractions</h2>  {amenities.attractions?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.bathroom?.length == 0 ? (
                            <div className="amenities">
                                <h2>Bathroom</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Bathroom</h2>  {amenities.bathroom?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.bedroom?.length == 0 ? (
                            <div className="amenities">
                                <h2>Bedroom</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Bedroom</h2>  {amenities.bedroom?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.cleaning?.length == 0 ? (
                            <div className="amenities">
                                <h2>Cleaning</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>cleaning</h2>  {amenities.cleaning?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.entertainment?.length == 0 ? (
                            <div className="amenities">
                                <h2>Entertainment</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Entertainment</h2>  {amenities.entertainment?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.family?.length == 0 ? (
                            <div className="amenities">
                                <h2>Family</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Family</h2>  {amenities.family?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.facilities?.length == 0 ? (
                            <div className="amenities">
                                <h2>Facilities</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Facilities</h2>  {amenities.facilities?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.internet_and_office?.length == 0 ? (
                            <div className="amenities">
                                <h2>Internet and Office</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Internet and Office</h2>  {amenities.internet_and_office?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.kitchen_and_dining?.length == 0 ? (
                            <div className="amenities">
                                <h2>Kitchen and Dining</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Kitchen and Dining</h2>  {amenities.kitchen_and_dining?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.outdoors?.length == 0 ? (
                            <div className="amenities">
                                <h2>Outdoors</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Outdoors</h2>  {amenities.outdoors?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.parking?.length == 0 ? (
                            <div className="amenities">
                                <h2>Parking</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Parking</h2>  {amenities.parking?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.safety?.length == 0 ? (
                            <div className="amenities">
                                <h2>Safety</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Safety</h2>  {amenities.safety?.map((amenity, index) => (
                                <li key={index}>{amenity.amenity}</li>
                            ))}</div>
                        )}
                    </Fragment>
                    <br></br>
                    <Fragment>
                    { amenities.services?.length == 0 ? (
                            <div className="amenities">
                                <h2>Services</h2> 
                                <p>Sorry, no items available</p>
                            </div>
                        ) : (
                            <div className="amenities"><h2>Services</h2>  {amenities.services?.map((amenity, index) => (
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

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Properties extends Component{
    constructor(props){
        super(props);
        this.state =  {
            propertiesList: [],
           
        }
    }

    componentDidMount(){
        this.showProperties();
    }

    async showProperties(){
        axios
            .get('/api/properties')
            .then((res) => this.setState({ propertiesList: res.data }))
            .catch((err) => console.log(err))

        // const [ firstResponse, secondResponse ] = await Promise.all([
        //     axios.get('/api/properties/'),
        //     axios.get('/api/propertyImages/')
        // ])
        // this.setState(
        //     {propertiesList: firstResponse.data,
        //     propertyImagesList: secondResponse.data}
        // )
    }

    
    render(){
        const { propertiesList } = this.state;
        // const { propertyImagesList } = this.state;
        return(
            <div className="properties_body">
                {/* <h1>Properties</h1> */}
                <br></br>
                <div>
                    {propertiesList.map((property, index) => (
                        
                        <div key={index}>
                            <Link to={{ pathname: `/properties/${property.slug}/${property.id}` }}>
                                <h2>{property.title}</h2>
                                <img src={property.image} alt={property.title} width="200"></img>
                                <p>{property.type}</p>
                                <p>{property.location}</p>
                                <p><strong> {property.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})}</strong></p>
                                <br></br>
                            </Link>
                            
                            <hr></hr>
                        </div>
                    ))}
                    <br></br>
                </div>
            </div>
        )
    }
}


// <h1>Property Images</h1>
//                     {propertyImagesList.map((propertyImage) => (
//                         <div key={propertyImage.id}>
//                             <p>{propertyImage.property}</p>
//                             <img src={propertyImage.images} alt={propertyImage.property} width="200" />
//                             {/* {propertyImage.images.map((image) => (
//                                 <img src={image}  width="200" />   
//                             ))}; */}
//                         </div>
//                     ))}

//                     <br></br>
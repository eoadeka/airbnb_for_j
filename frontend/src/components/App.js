import React, { Component } from "react";
import  ReactDOM from "react-dom/client";
import reportWebVitals from '../reportWebVitals';
import Layout from "./layout/Layout";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Layout>
                
            </Layout>
        );
    }
}

const appDiv = ReactDOM.createRoot(document.getElementById("app"));
appDiv.render(
    <React.StrictMode>
         <App/>
    </React.StrictMode>
);
reportWebVitals();

// import React from "react";
// import  ReactDOM  from "react-dom";
// import * as ReactDOMClient from "react-dom/client";
// // import reportWebVitals from "./reportWebVitals";
// import App from "./components/App";
// // import React from "react";


// const appDiv = ReactDOMClient.createRoot(document.getElementById("app"));
// appDiv.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
// );

// // reportWebVitals();
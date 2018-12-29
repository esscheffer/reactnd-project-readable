import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import uuidv4 from "uuid/v4";
import {handleInitialData} from "./actions/shared";
import {connect} from "react-redux";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        console.log(uuidv4());

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default connect()(App);

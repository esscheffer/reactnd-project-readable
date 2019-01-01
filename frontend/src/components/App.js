import React, {Component} from 'react';
import '../App.css';

import uuidv4 from "uuid/v4";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";
import PostList from "./PostList";
import LoadingBar from 'react-redux-loading'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        console.log(uuidv4());

        return (
            <div>
                <LoadingBar />
                {this.props.loading === true
                    ? null
                    : <PostList />}
                    {/*: <NewPost />}*/}
            </div>
        );
    }
}

function mapStateToProps ({posts}) {
    return {
        loading: posts.postsList.loading
    }
}

export default connect(mapStateToProps)(App)

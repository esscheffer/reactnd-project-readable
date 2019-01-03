import React, {Component, Fragment} from 'react'
import '../App.css';
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";
import PostList from "./PostList";
import LoadingBar from 'react-redux-loading'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import PostPage from "./PostPage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Link from "react-router-dom/es/Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = {
    toolbar: {
        marginBottom: 16,
    },
    homeToolbarLink: {
        textDecoration: 'none',
        color: 'white'
    }
};

class App extends Component {
    state = {
        value: 0
    };

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;

        return (
            <Router>
                <Fragment>
                    <AppBar position="static" className={classes.toolbar}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                <Link to='/' className={classes.homeToolbarLink}>
                                    Home
                                </Link>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <LoadingBar/>
                    <Tabs value={this.state.value}
                          indicatorColor="primary"
                          textColor="primary"
                          onChange={this.handleChange}>
                        <Tab label="All"/>
                        {this.props.categories.map((category) => (
                            <Tab label={category.name}/>
                        ))}
                    </Tabs>
                    <div>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/' exact component={PostList}/>
                                <Route path='/:category' component={PostList}/>
                                <Route path='/post/:id' exact component={PostPage}/>
                            </div>
                        }
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({posts, categories}) {
    return {
        loading: posts.postsList.loading,
        categories: categories.categoriesList ? categories.categoriesList.categories : []
    }
}

export default connect(mapStateToProps)(withStyles(styles)(App));

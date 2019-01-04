import React, {Component} from 'react';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "react-router-dom/es/Link";
import {withRouter} from "react-router-dom";

const styles = {};

class CategoriesTabs extends Component {
    state = {};

    render() {
        console.log("CategoriesTabs", this.props);
        return (
            <Tabs value={this.props.category}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                  centered={true}>
                <Tab key="all"
                     value='all'
                     label="All"
                     component={Link}
                     to={'/'}/>
                {this.props.categories.map((category) => (
                    <Tab key={category.path}
                         value={category.path}
                         label={category.name}
                         component={Link}
                         to={`/${category.path}`}/>
                ))}
            </Tabs>
        );
    }
}

function mapStateToProps({posts, categories}, props) {
    const category = props.match.params.category || 'all';
    return {
        loading: posts.postsList.loading,
        categories: categories.categoriesList ? categories.categoriesList.categories : [],
        category
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CategoriesTabs)));

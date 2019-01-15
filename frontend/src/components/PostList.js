import React, {Component} from 'react';
import {connect} from "react-redux";
import Post from "./Post";
import Grid from "@material-ui/core/Grid";
import NewPost from "./NewPost";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import withStyles from "@material-ui/core/es/styles/withStyles";
import CategoriesTabs from "./CategoriesTabs";
import {sortFunction} from "../utils/SortUtils";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        width: '100%',
        textAlign: 'center'
    }
});

class PostList extends Component {
    state = {
        newPostFormOpen: false,
        postsSort: "timestamp"
    };

    openNewPostForm = event => {
        event.preventDefault();
        this.setState({newPostFormOpen: true});
    };

    closeNewPostForm = event => {
        if (event) {
            event.preventDefault();
        }
        this.setState({newPostFormOpen: false});
    };

    handleSortChange = (event, postsSort) => {
        this.setState({postsSort});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <CategoriesTabs/>
                <h3 style={{textAlign: 'center'}}>POSTS</h3>

                {this.state.newPostFormOpen
                    ? <NewPost handleClose={this.closeNewPostForm}/>
                    : <div className={classes.fab}>
                        <Fab color="primary" aria-label="Add" onClick={this.openNewPostForm}>
                            <AddIcon/>
                        </Fab>
                    </div>
                }

                <Tabs value={this.state.postsSort}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleSortChange}
                      centered={true}>
                    <Tab key="timestamp"
                         value='timestamp'
                         label="New"/>
                    <Tab key="voteScore"
                         value='voteScore'
                         label="Hot"/>
                </Tabs>

                <Grid container
                      direction="column"
                      justify="space-between"
                      spacing={16}
                      style={{minWidth: '100%'}}
                      alignItems="center">
                    {this.props.posts.slice().sort(sortFunction(this.state.postsSort)).map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                </Grid>
            </div>
        )
    }
}

function mapStateToProps({posts}, props) {
    const {category} = props.match.params;

    let postsToShow = posts.postsList.posts;

    if (category) {
        postsToShow = postsToShow.filter((post) => post.category === category)
    }

    return {
        posts: postsToShow
    };
}

export default connect(mapStateToProps)(withStyles(styles)(PostList))

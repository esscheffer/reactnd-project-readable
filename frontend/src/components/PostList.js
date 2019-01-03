import React, {Component} from 'react';
import {connect} from "react-redux";
import Post from "./Post";
import Grid from "@material-ui/core/Grid";
import NewPost from "./NewPost";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        width: '100%',
        textAlign: 'center'
    }
});

class PostList extends Component {
    state = {
        newPostFormOpen: false
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

    render() {
        const {classes} = this.props;
        return (
            <div>
                <h3 style={{textAlign: 'center'}}>POSTS</h3>

                {this.state.newPostFormOpen
                    ? <NewPost handleClose={this.closeNewPostForm}/>
                    : <div className={classes.fab}>
                        <Fab color="primary" aria-label="Add" onClick={this.openNewPostForm}>
                            <AddIcon/>
                        </Fab>
                    </div>
                }

                <Grid container
                      direction="column"
                      justify="space-between"
                      spacing={16}
                      style={{minWidth: '100%'}}
                      alignItems="center">
                    {this.props.posts.map((post) => (
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
            .sort((a, b) => b.timestamp - a.timestamp)
    };
}

export default connect(mapStateToProps)(withStyles(styles)(PostList))

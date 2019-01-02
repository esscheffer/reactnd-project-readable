import React, {Component} from 'react';
import Post from "./Post";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Redirect from "react-router-dom/es/Redirect";

const styles = theme => ({});

class PostPage extends Component {
    state = {
        toHome: false
    };

    handlePostDelete = () => {
        this.setState({toHome: true});
    };

    render() {
        const {toHome} = this.state;

        if (toHome === true) {
            return <Redirect to={`/`}/>
        }

        return (
            <div>
                <Grid container
                      direction="column"
                      justify="space-between"
                      spacing={16}
                      style={{width: '100%'}}
                      alignItems="center">
                    {this.props.post ? <Post post={this.props.post}
                                             titleClickable={false}
                                             onDeleteAction={this.handlePostDelete}/>
                        : <p>This post doesn't exist</p>}
                </Grid>
            </div>
        );
    }
}

function mapStateToProps({posts}, props) {
    const {id} = props.match.params;

    return {
        id,
        post: posts.postsList.posts.find(function (post) {
            return post.id === id;
        })
    };
}

export default connect(mapStateToProps)(withStyles(styles)(PostPage))

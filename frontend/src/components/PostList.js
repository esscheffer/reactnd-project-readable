import React, {Component} from 'react';
import {connect} from "react-redux";
import Post from "./Post";
import Grid from "@material-ui/core/Grid";

class PostList extends Component {
    render() {
        return (
            <div>
                <h3 style={{textAlign: 'center'}}>POSTS</h3>

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

function mapStateToProps({posts}) {
    return {
        posts: posts.postsList.posts
            .sort((a, b) => b.timestamp - a.timestamp)
    };
}

export default connect(mapStateToProps)(PostList)

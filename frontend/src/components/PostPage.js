import React, {Component} from 'react';
import Post from "./Post";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Redirect from "react-router-dom/es/Redirect";
import {handleGetComments} from "../actions/comments";
import Comment from "./Comment";
import Divider from "@material-ui/core/Divider";

class PostPage extends Component {
    state = {
        toHome: false
    };

    handlePostDelete = () => {
        this.setState({toHome: true});
    };

    componentDidMount() {
        if (this.props.post) {
            this.props.dispatch(handleGetComments(this.props.post.id))
        }
    }

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
                      style={{width: '100%', marginBottom: 8}}
                      alignItems="center">
                    {this.props.post ? <Post post={this.props.post}
                                             titleClickable={false}
                                             onDeleteAction={this.handlePostDelete}
                                             detailsPage={true}/>
                        : <p>This post doesn't exist</p>}
                </Grid>

                <Divider style={{marginTop: '8dp'}}/>

                <h3 style={{textAlign: 'center'}}>COMMENTS</h3>
                <Grid container
                      direction="column"
                      justify="space-between"
                      spacing={16}
                      style={{width: '100%'}}
                      alignItems="center">
                    {this.props.comments ?
                        this.props.comments.map((comment) => (
                            <Comment key={comment.id} comment={comment}/>
                        ))
                        : null}
                </Grid>
            </div>
        );
    }
}

function mapStateToProps({posts, comments}, props) {
    const {id} = props.match.params;

    return {
        id,
        post: posts.postsList.posts.find(function (post) {
            return post.id === id;
        }),
        comments: comments.comments
    };
}

export default connect(mapStateToProps)(PostPage)

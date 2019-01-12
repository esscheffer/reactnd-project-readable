import React, {Component} from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {handleGetComments} from "../actions/comments";
import Divider from "@material-ui/core/Divider";
import {sortFunction} from "../utils/SortUtils";
import PostFormContainer from "./PostFormContainer";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import withStyles from "@material-ui/core/es/styles/withStyles";
import NewComment from "./NewComment";
import PostNotFoundPage from "./PostNotFoundPage";
import CommentFormContainer from "./CommentFormContainer";

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        width: '100%',
        textAlign: 'center'
    }
});

class PostPage extends Component {
    state = {newCommentFormOpen: false};

    componentDidMount() {
        if (this.props.post) {
            this.props.dispatch(handleGetComments(this.props.post.id))
        }
    }

    closeNewCommentForm = event => {
        if (event) {
            event.preventDefault();
        }
        this.setState({newCommentFormOpen: false});
    };

    openNewCommentForm = event => {
        event.preventDefault();
        this.setState({newCommentFormOpen: true});
    };

    render() {
        const {classes, post} = this.props;

        return (
            <div>
                {post ? <div>
                        <Grid container
                              direction="column"
                              justify="space-between"
                              spacing={16}
                              style={{width: '100%', marginBottom: 8}}
                              alignItems="center">
                            {post ? <PostFormContainer post={post}/>
                                : <PostNotFoundPage/>
                            }
                        </Grid>

                        <Divider style={{marginTop: '8dp'}}/>

                        <h3 style={{textAlign: 'center'}}>COMMENTS</h3>

                        {this.state.newCommentFormOpen
                            ? <NewComment handleClose={this.closeNewCommentForm} postId={post.id}/>
                            : <div className={classes.fab}>
                                <Fab color="primary" aria-label="Add" onClick={this.openNewCommentForm}>
                                    <AddIcon/>
                                </Fab>
                            </div>
                        }

                        <Grid container
                              direction="column"
                              justify="space-between"
                              spacing={16}
                              style={{width: '100%'}}
                              alignItems="center">
                            {this.props.comments ?
                                this.props.comments.map((comment) => (
                                    <CommentFormContainer key={comment.id} comment={comment}/>
                                ))
                                : null}
                        </Grid>
                    </div>
                    : <PostNotFoundPage/>
                }

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
        comments: comments.comments ? comments.comments.sort(sortFunction("timestamp")) : []
    };
}

export default connect(mapStateToProps)(withStyles(styles)(PostPage))

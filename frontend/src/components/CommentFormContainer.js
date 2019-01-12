import React, {Component} from 'react';
import CommentEdit from "./CommentEdit";
import Comment from "./Comment";

class CommentFormContainer extends Component {
    state = {
        commentEditFormOpen: false
    };

    openEditCommentForm = event => {
        event.preventDefault();
        this.setState({commentEditFormOpen: true});
    };

    closeEditCommentForm = event => {
        if (event) {
            event.preventDefault();
        }
        this.setState({commentEditFormOpen: false});
    };

    render() {
        return (
            <div style={{width: '80%', marginBottom: 8}}>
                {
                    this.state.commentEditFormOpen
                        ? <CommentEdit comment={this.props.comment} handleClose={this.closeEditCommentForm}/>
                        : <Comment comment={this.props.comment}
                                   editAction={this.openEditCommentForm}/>
                }
            </div>
        );
    }
}

export default CommentFormContainer;

import React, {Component} from 'react';
import Post from "./Post";
import Redirect from "./PostPage";
import PostEdit from "./PostEdit";

class PostFormContainer extends Component {
    state = {
        toHome: false,
        postEditFormOpen: false
    };

    handlePostDelete = () => {
        this.setState({toHome: true});
    };

    openEditPostForm = event => {
        event.preventDefault();
        this.setState({postEditFormOpen: true});
    };

    closeEditPostForm = event => {
        if (event) {
            event.preventDefault();
        }
        this.setState({postEditFormOpen: false});
    };

    render() {
        const {toHome} = this.state;

        if (toHome === true) {
            return <Redirect to={`/`}/>
        }

        return (
            <div style={{width: '80%'}}>
                {
                    this.state.postEditFormOpen
                        ? <PostEdit post={this.props.post} handleClose={this.closeEditPostForm}/>
                        : <Post post={this.props.post}
                                titleClickable={false}
                                onDeleteAction={this.handlePostDelete}
                                editAction={this.openEditPostForm}
                                detailsPage={true}/>
                }
            </div>
        );
    }
}

export default PostFormContainer;

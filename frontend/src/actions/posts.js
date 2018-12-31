import {deletePostServer, saveDownVotePost, saveUpVotePost} from "../utils/ApiUtils";

export const SET_POSTS = 'SET_POSTS';
export const FETCHING_POSTS = 'FETCHING_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const CANCEL_DELETE_POST = 'CANCEL_DELETE_POST';

export function setPosts(posts) {
    return {
        type: SET_POSTS,
        posts
    }
}

export function fetchingPosts() {
    return {
        type: FETCHING_POSTS
    }
}

function upVotePost(post) {
    return {
        type: UPVOTE_POST,
        postId: post.id
    }
}

function downVotePost(post) {
    return {
        type: DOWNVOTE_POST,
        postId: post.id
    }
}

function deletePost(post) {
    return {
        type: DELETE_POST,
        postId: post.id
    }
}

function cancelDeletePost(post) {
    return {
        type: CANCEL_DELETE_POST,
        post
    }
}

export function handleUpVotePost(post) {
    return (dispatch) => {
        dispatch(upVotePost(post));

        return saveUpVotePost(post.id)
            .catch((e) => {
                console.warn('Error in handleUpVotePost: ', e);
                dispatch(downVotePost(post));
                alert('The was an error up voting the post. Try again.')
            })
    }
}

export function handleDownVotePost(post) {
    return (dispatch) => {
        dispatch(downVotePost(post));

        return saveDownVotePost(post.id)
            .catch((e) => {
                console.warn('Error in handleDownVotePost: ', e);
                dispatch(upVotePost(post));
                alert('The was an error up voting the post. Try again.')
            })
    }
}

export function handleDeletePost(post) {
    return (dispatch) => {
        dispatch(deletePost(post));

        return deletePostServer(post.id)
            .catch((e) => {
                console.warn('Error in handleDeletPost: ', e);
                dispatch(cancelDeletePost(post));
                alert('The was an error deleting the post. Try again.')
            })
    }
}
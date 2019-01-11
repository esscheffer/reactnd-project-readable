import {createPostServer, deletePostServer, editPostServer, saveDownVotePost, saveUpVotePost} from "../utils/ApiUtils";

export const SET_POSTS = 'SET_POSTS';
export const FETCHING_POSTS = 'FETCHING_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const EDIT_POST = 'EDIT_POST';
export const POST_COUNT_DOWN = 'POST_COUNT_DOWN';
export const POST_COUNT_UP = 'POST_COUNT_UP';

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

function removePost(post) {
    return {
        type: REMOVE_POST,
        postId: post.id
    }
}

function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

function editPost(postUpdate) {
    return {
        type: EDIT_POST,
        postUpdate
    }
}

export function commentCountDown(postId) {
    return {
        type: POST_COUNT_DOWN,
        postId
    }
}

export function commentCountUp(postId) {
    return {
        type: POST_COUNT_UP,
        postId
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
        dispatch(removePost(post));

        return deletePostServer(post.id)
            .catch((e) => {
                console.warn('Error in handleDeletPost: ', e);
                dispatch(addPost(post));
                alert('The was an error deleting the post. Try again.')
            })
    }
}

export function handleCreatePost(post) {
    return (dispatch) => {
        dispatch(addPost(post));

        return createPostServer(post)
            .catch((e) => {
                console.warn('Error in handleCreatePost: ', e);
                dispatch(removePost(post));
                alert('The was an error creating the post. Try again.')
            })
    }
}

export function handleEditPost(postUpdate, oldPost) {
    return (dispatch) => {
        dispatch(editPost(postUpdate));

        return editPostServer(postUpdate)
            .catch((e) => {
                console.warn('Error in handleEditPost: ', e);
                dispatch(editPost(oldPost));
                alert('The was an error editing the post. Try again.')
            })
    }
}